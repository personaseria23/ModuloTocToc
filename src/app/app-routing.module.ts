import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'lugares',
    loadChildren: () => import('./lugares/lugares/lugares.module').then( m => m.LugaresPageModule)
  },
  {
    path: 'clarifai-api',
    loadChildren: () => import('./clarifai/clarifai-api/clarifai-api.module').then( m => m.ClarifaiAPIPageModule)
  },
  {
    path: 'postclarifai',
    loadChildren: () => import('./clarifai/postclarifai/postclarifai.module').then( m => m.PostclarifaiPageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
