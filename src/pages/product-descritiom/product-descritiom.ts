import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/app.model';
import { DataBase } from '../../app/services/data-base';

@Component({
  selector: 'app-product-descrition',
  standalone: true,
  imports: [],
  templateUrl: './product-descritiom.html',
  styleUrl: './product-descritiom.scss',
})
export class ProductDescrition implements OnInit {
  private productId = signal<number | null>(null);

  protected product = computed(() => {
    const id = this.productId();
    return id !== null ? this.db.getProductById(id) : undefined;
  });

  constructor(
    protected route: ActivatedRoute,
    protected db: DataBase,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.productId.set(+id);
      }
      console.log(this.productId());
    });
  }
}
