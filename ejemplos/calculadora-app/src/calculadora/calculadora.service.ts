import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
  sumar(sumando1: number, sumando2: number): number {
    if (sumando1 < 0 || sumando2 < 0) {
      throw new Error('No se permiten números negativos');
    }
    return sumando1 + sumando2;
  }
}
