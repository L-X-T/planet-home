# Loading Separately Compiled Libraries (Microfrontends)

- [Loading Separately Compiled Libraries (Microfrontends)](#loading-separately-compiled-libraries-microfrontends)
  - [Creating a Lib](#creating-a-lib)
  - [Build and "Deploy" the Lib](#build-and-deploy-the-lib)
  - [Load Separately Compiled Library](#load-separately-compiled-library)

In this Lab, you'll load a separately compiled library which acts as a microfrontend.

## Creating a Lib

1. Generate a new ``bonus-miles`` lib:

    ```
    ng g lib bonus-miles --buildable
    ```

    **Remarks:** The ``buildable`` switch makes sure the library can be compiled separately.


2. Generate a ``BonusMilesComponent`` for this lib:

    ```
    ng g component bonus-miles --project bonus-miles
    ```
   
3. Open the file ``bonus-miles.component.html`` and add some content:

    ```html
    <h1>Your Bonus Miles</h1>

    <p>
        You have 17,388 bonus miles.
    </p>
    ```

4. Open the file ``bonus-miles.module.ts`` and add a child route for your component:

    ```typescript
    [...]
    // Add this line:
    import { RouterModule } from '@angular/router';

    @NgModule({
        imports: [
            CommonModule,
            // Add this line;
            RouterModule.forChild([
                { path: '', component: BonusMilesComponent }
            ])
        ],
        declarations: [
            BonusMilesComponent
        ]
    })
    export class BonusMilesModule {}
    ```

    **Hint:** You might need to import the ``RouterModule`` manually.

## Build and "Deploy" the Lib

1. Build your lib:

    ```
    ng build bonus-miles
    ```

    If you use the ``--prod`` switch, make sure that your ``tsconfig.lib.prod.json`` does not disable ivy. Make sure ``enableIvy`` is set to ``true``. You dont't have to use --prod as libraries are always build for production. The only difference is that --prod makes the CLI to use the file ``tsconfig.lib.prod.json``.

2. Simulate a deployment of the library by copying the generated UMD bundle into the ``flight-app``'s ``assets`` folder. For this, copy the file
    ```
    dist/libs/bonus-miles/bundles/flight-workspace-bonus-miles.umd.js
    ```
    to the folder
    ```
    apps/flight-app/src/assets
    ```

## Load Separately Compiled Library 

1. Switch to your ``flight-app`` and create a file ``apps\flight-app\src\app\externals-utils.ts``.

2. In this file, insert the following code:

    ```typescript
    declare const require: any;

    const moduleMap = {};

    export function loadModule(umdFileName: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            if (moduleMap[umdFileName]) {
                resolve(window);
                return;
            }

            const script = document.createElement('script');
            script.src = umdFileName;
            
            script.onerror = reject;
            
            script.onload = () => {
                moduleMap[umdFileName] = true;
                resolve(window); // window is the global namespace
            }
            
            document.body.append(script);
        });
    }
    ```

    Please note that the ``loadModule`` takes the path to an UMD bundle and loads it dynamically by adding a ``script`` tag for it. 
    
    After loading our bundle, we should find the ``BonusMilesModule`` in ``window['flight-workspace']['bonus-miles'].BonusMilesModule``.
    
3. To the same file, also add the following function:    
    
    ```typescript
    export function initExternals(production: boolean) {
        (window as any).ng = {};
        (window as any).ng.core = require('@angular/core');
        (window as any).ng.forms = require('@angular/forms');
        (window as any).ng.common = require('@angular/common');
        (window as any).ng.router = require('@angular/router');
        (window as any).ng.platformBrowser = require('@angular/platform-browser');

        if (!production) {
            (window as any).ng.platformBrowserDynamic = require('@angular/platform-browser-dynamic');
            (window as any).ng.compiler = require('@angular/compiler');
        }
    }
    ```

    Please note that ``initExternals`` puts the libraries our shell wants to share with ``bonus-miles`` into the global namespace.

4. Open your ``flight-app``'s ``main.ts`` and add a call for ``initExternals``:

    ```typescript
    initExternals(environment.production);
    ```

5. Open the file ``app.routes`` and add a lazy route loading the external UMD bundle with ``loadModule``:

    ```typescript
    export const APP_ROUTES: Routes = [
    [...],
    {
        path: 'bonus-miles',
        loadChildren: () => loadModule('./assets/flight-workspace-bonus-miles.umd.js')
                              .then(g => g['flight-workspace']['bonus-miles'].BonusMilesModule)
    },
    // This routes MUST be the last one!
    {
        path: '**',
        redirectTo: 'home'
    }
    ];
    ```

6. Open the file ``sidebar.component.html`` and add a link for your new route:

    ```html
    <li>
        <a routerLink="bonus-miles">
            <i class="ti-arrow-top-right"></i>
            <p>Miles</p>
        </a>
    </li>
    ```

7. Start your ``flight-app`` (``npm start`` or ``ng serve flight-app -o``) and navigate to ``Miles``.

    You should see that your UMD is loaded and the containing component should be activated be the router:

    <img src="https://i.imgur.com/HOjmnTu.png" width="800">