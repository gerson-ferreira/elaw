import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroProdutoComponent } from 'src/app/pages/cadastro-produto/cadastro-produto.component';
import { ListagemProdutoComponent } from 'src/app/pages/listagem-produto/listagem-produto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    ClipboardModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    TextMaskModule
  ],
  declarations: [
    DashboardComponent,
    CadastroProdutoComponent,
    ListagemProdutoComponent
  ]
})

export class AdminLayoutModule {}
