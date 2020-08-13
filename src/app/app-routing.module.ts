import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RootComponent } from './root/root.component';
import { WorldCasesComponent } from './components/world-cases/world-cases.component';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';


const routes: Routes = [
  { path: '', component: RootComponent,
    children: [
      { path: '', component: WorldCasesComponent },
      { path: 'data-tables', component: DataTablesComponent },
      { path: 'graphs', component: GraphsComponent },
      { path: 'latest-news', component: LatestNewsComponent },

    ]
},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
