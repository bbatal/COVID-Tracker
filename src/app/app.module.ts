import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Components/modules/routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RootComponent } from './root/root.component';
import { WorldCasesComponent } from './components/world-cases/world-cases.component';

//services
import { ConfigService } from './services/config.service';

//Angular Material Dependencies
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { HighchartsChartModule } from 'highcharts-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';


@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    SideNavComponent,
    ToolbarComponent,
    RootComponent,
    WorldCasesComponent,
    DataTablesComponent,
    GraphsComponent,
    LatestNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    HighchartsChartModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDividerModule,
    MatCardModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
