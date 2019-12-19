import { Category } from '../../categories/shared/category.model';

export class Entry {
    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    }

    constructor(public id?: number, public name?: string, public description?: string,
        public type?: string, public date?: string, public paid?: boolean, public amount?: string,
        public categoryId?: number, public category?: Category) {
    }

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente';
    }

    get revenue(): boolean {
        return this.type === 'revenue';
    }
}