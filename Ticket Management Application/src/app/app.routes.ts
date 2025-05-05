import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { RoleGuard } from './core/guard/role.guard';
import { PrevoznikListComponent } from './features/prevoznik/prevoznik-list/prevoznik-list.component';
import { PrevoznikFormComponent } from './features/prevoznik/prevoznik-form/prevoznik-form.component';
import { KartaFormComponent } from './features/karta/karta-form/karta-form.component';
import { TimelineComponent } from './features/karta/timeline/timeline.component';

export const routes: Routes = [
    { 
        path: '',
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    { path: 'prevoznici', 
        component: PrevoznikListComponent, 
        canActivate: [authGuard, RoleGuard],
        data: { roles: ['ROLE_ADMIN'] } 
    },
    { path: 'prevoznici/add', component: PrevoznikFormComponent, canActivate: [authGuard, RoleGuard],
        data: { roles: ['ROLE_ADMIN'] } 
    },
    { path: 'prevoznici/edit/:id', component: PrevoznikFormComponent, canActivate: [authGuard, RoleGuard],
        data: { roles: ['ROLE_ADMIN'] } 
    },
    {
        path: 'prevoznici/:idPrevoznika/statistika',
        loadComponent: () => import('./features/prevoznik/statistika/prevoznik-statistika/prevoznik-statistika.component').then(m => m.PrevoznikStatistikaComponent),
        canActivate: [authGuard, RoleGuard],
        data: { roles: ['ROLE_ADMIN'] } 
    },      
    {
        path: 'karte',
        loadComponent: () => import('./features/karta/karta-list/karta-list.component').then(m => m.KartaListComponent),
        canActivate: [authGuard, RoleGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] }
    },
    { path: 'karte/add', component: KartaFormComponent, canActivate: [authGuard, RoleGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } 
    },
    { path: 'karte/edit/:id', component: KartaFormComponent, canActivate: [authGuard, RoleGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } 
    },
    { path: 'karte/timeline/:imeVlasnika', component: TimelineComponent, canActivate: [authGuard, RoleGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } 
    },
];