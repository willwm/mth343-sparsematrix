import { Matrix } from './matrix';

export class Arnoldi {
  private q: Matrix[];
  private v: Matrix[];
  private k: number;

  constructor(private A: Matrix, private m?: number) {
  }


}
