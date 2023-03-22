import { TestBed } from '@angular/core/testing';
import { ProdutoService } from './produto.service';
import { Produto } from '../shared/models/produto.model';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product and update product list', () => {
    const product: Produto = {
      id: 1,
      nome: 'Test Product',
      modelo: 'Model X',
      preco: '100,00',
      descricao: 'Test product description',
    };

    service.addProduto(product);
    service.getProdutos().subscribe((produtos) => {
      expect(produtos).toEqual([product]);
    });
  });

  it('should update a product', () => {
    const product: Produto = {
      id: 1,
      nome: 'Test Product',
      modelo: 'Model X',
      preco: '100,00',
      descricao: 'Test product description',
    };

    const updatedProduct: Produto = {
      ...product,
      nome: 'Updated Test Product',
    };

    service.addProduto(product);
    service.updateProduto(updatedProduct);
    service.getProdutos().subscribe((produtos) => {
      expect(produtos).toEqual([updatedProduct]);
    });
  });

  it('should delete a product', () => {
    const product: Produto = {
      id: 1,
      nome: 'Test Product',
      modelo: 'Model X',
      preco: '100,00',
      descricao: 'Test product description',
    };

    service.addProduto(product);
    service.deleteProduto(product.id);
    service.getProdutos().subscribe((produtos) => {
      expect(produtos).toEqual([]);
    });
  });

  it('should edit a product', () => {
    const product: Produto = {
      id: 1,
      nome: 'Test Product',
      modelo: 'Model X',
      preco: '100,00',
      descricao: 'Test product description',
    };

    service.editProduto(product);
    service.getEditedProduto().subscribe((editedProduct) => {
      expect(editedProduct).toEqual(product);
    });
  });

  it('should clear edited product', () => {
    service.clearEditedProduto();
    service.getEditedProduto().subscribe((editedProduct) => {
      expect(editedProduct).toBeNull();
    });
  });
});