export class IListTransactions {
  trans_token: Transaction[];
}

export class ICreateTransaction {
  trans_token: Transaction;
}

export class Transaction {
  amount: number;
  balance: number;
  date: string;
  id: number;
  username: string;
}
