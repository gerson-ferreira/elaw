import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ProdutoService } from "src/app/services/produto.service";
import { Produto } from "src/app/shared/models/produto.model";
import { createNumberMask } from 'text-mask-addons';

@Component({
  selector: "app-cadastro-produto",
  templateUrl: "./cadastro-produto.component.html",
  styleUrls: ["./cadastro-produto.component.css"],
})
export class CadastroProdutoComponent implements OnInit, OnDestroy {
  modelos: string[] = ['Modelo 1', 'Modelo 2', 'Modelo 3'];
  subscription: Subscription = new Subscription();
  submitted = false;
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl("", Validators.required),
    modelo: new FormControl("", Validators.required),
    preco: new FormControl("", Validators.required),
    descricao: new FormControl("", Validators.required),
  });

  constructor(private produtoService: ProdutoService) {}

  public currencyMask = createNumberMask({
    prefix: 'R$ ',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    requireDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: false
  });

  ngOnInit(): void {
    this.subscription.add(
      this.produtoService.getEditedProduto().subscribe((produto) => {
        if (produto) {
          this.form.patchValue(produto);
        } else {
          this.form.reset();
        }
      })
    );
  }

  onSubmit(): void {
    this.submitted = true;
    const produto: Produto = {
      ...this.form.value,
    } as Produto;

    if (this.form.invalid) {
      return;
    }

    if (produto.id) {
      this.produtoService.updateProduto(produto);
    } else {
      produto.id = this.generateId(7);
      this.produtoService.addProduto(produto);
    }

    this.resetForm();
  }

  generateId(maxDigits): number {
    const min = Math.pow(10, maxDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  resetForm(): void {
    this.form.reset({
      id: null,
      nome: '',
      modelo: '',
      preco: '',
      descricao: '',
    });
    this.submitted = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

