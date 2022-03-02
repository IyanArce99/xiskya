import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'oraciones-modal',
    loadChildren: () => import('./pages/oraciones-modal/oraciones-modal.module').then( m => m.OracionesModalPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'modal-reset',
    loadChildren: () => import('./pages/modal-reset/modal-reset.module').then( m => m.ModalResetPageModule)
  },
  {
    path: 'modal-mensajes',
    loadChildren: () => import('./pages/modal-mensajes/modal-mensajes.module').then( m => m.ModalMensajesPageModule)
  },
  {
    path: 'modal-mostrar-calendario',
    loadChildren: () => import('./pages/modal-mostrar-calendario/modal-mostrar-calendario.module').then( m => m.ModalMostrarCalendarioPageModule)
  },
  {
    path: 'modal-delete-event',
    loadChildren: () => import('./pages/modal-delete-event/modal-delete-event.module').then( m => m.ModalDeleteEventPageModule)
  },  {
    path: 'modal-mensajes-respuesta',
    loadChildren: () => import('./pages/modal-mensajes-respuesta/modal-mensajes-respuesta.module').then( m => m.ModalMensajesRespuestaPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
