import { Category } from '../../categories/shared/category.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Entry  extends BaseResourceModel {
    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    }

    constructor(public id?: number, public name?: string, public description?: string,
        public type?: string, public date?: string, public paid?: boolean, public amount?: string,
        public categoryId?: number, public category?: Category) {
            super();
    }

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente';
    }

    get revenue(): boolean {
        return this.type === 'revenue';
    }
}