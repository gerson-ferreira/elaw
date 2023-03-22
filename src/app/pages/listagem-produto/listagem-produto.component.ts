import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/shared/models/produto.model';

@Component({
  selector: 'app-listagem-produto',
  templateUrl: './listagem-produto.component.html',
  styleUrls: ['./listagem-produto.component.css'],
})
export class ListagemProdutoComponent implements OnInit {
  produtos$: Observable<Produto[]>;

  constructor(private produtoService: ProdutoService) {
    this.produtos$ = this.produtoService.getProdutos();
  }

  ngOnInit(): void {}

  onDelete(id: number): void {
    this.produtoService.deleteProduto(id);
  }

  onEdit(produto: Produto): void {
    this.produtoService.editProduto(produto);
  }
}