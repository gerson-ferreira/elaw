import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';
import { ListagemProdutoComponent } from './listagem-produto.component';

describe('ListagemProdutoComponent', () => {
  let component: ListagemProdutoComponent;
  let fixture: ComponentFixture<ListagemProdutoComponent>;
  let produtoService: jasmine.SpyObj<ProdutoService>;
  let produtos: Produto[];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProdutoService', ['getProdutos', 'deleteProduto', 'editProduto']);

    TestBed.configureTestingModule({
      declarations: [ListagemProdutoComponent],
      providers: [{ provide: ProdutoService, useValue: spy }],
    });

    fixture = TestBed.createComponent(ListagemProdutoComponent);
    component = fixture.componentInstance;
    produtoService = TestBed.inject(ProdutoService) as jasmine.SpyObj<ProdutoService>;

    produtos = [
      { id: 1, nome: 'Produto 1', modelo: 'Modelo 1', preco: '100.00', descricao: 'Descrição 1' },
      { id: 2, nome: 'Produto 2', modelo: 'Modelo 2', preco: '200.00', descricao: 'Descrição 2' },
    ];

    produtoService.getProdutos.and.returnValue(of(produtos));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteProduto on onDelete', () => {
    const productId = 1;
    component.onDelete(productId);
    expect(produtoService.deleteProduto).toHaveBeenCalledWith(productId);
  });

  it('should call editProduto on onEdit', () => {
    const produto: Produto = { id: 1, nome: 'Produto 1', modelo: 'Modelo 1', preco: '100.00', descricao: 'Descrição 1' };
    component.onEdit(produto);
    expect(produtoService.editProduto).toHaveBeenCalledWith(produto);
  });
});