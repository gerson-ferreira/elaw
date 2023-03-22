import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroProdutoComponent } from './cadastro-produto.component';
import { ProdutoService } from 'src/app/services/produto.service';
import { of } from 'rxjs';
import { Produto } from 'src/app/shared/models/produto.model';

describe('CadastroProdutoComponent', () => {
  let component: CadastroProdutoComponent;
  let fixture: ComponentFixture<CadastroProdutoComponent>;
  let produtoService: ProdutoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CadastroProdutoComponent],
      providers: [ProdutoService],
    }).compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProdutoComponent);
    component = fixture.componentInstance;
    produtoService = TestBed.inject(ProdutoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize form with values if edited product exists', () => {
    const editedProduto: Produto = {
      id: 1234567,
      nome: 'Test Product',
      modelo: 'Model X',
      preco: '100,00',
      descricao: 'Test product description',
    };
    spyOn(produtoService, 'getEditedProduto').and.returnValue(of(editedProduto));
    component.ngOnInit();
    expect(component.form.value).toEqual(editedProduto);
  });

  it('should reset form when resetForm is called', () => {
    component.resetForm();
    expect(component.form.value).toEqual({
      id: null,
      nome: '',
      modelo: '',
      preco: '',
      descricao: '',
    });
    expect(component.submitted).toBeFalse();
  });
});