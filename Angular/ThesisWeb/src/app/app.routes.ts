import { Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ThesisPageComponent } from './pages/thesis-page/thesis-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { AllThesesPageComponent } from './pages/all-theses-page/all-theses-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SearchPageComponent },
      { path: 'thesis/:id', component: ThesisPageComponent },
      { path: 'add', component: AddPageComponent },
      { path: 'all', component: AllThesesPageComponent },
      { path: 'edit/:id', component: EditPageComponent },
    ],
  },
];
