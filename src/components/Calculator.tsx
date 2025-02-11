
import { useState } from 'react';
import { calculateTotal, formatCurrency } from '../utils/calculator';
import { toast } from 'sonner';
import FeedbackForm from './FeedbackForm';

const Calculator = () => {
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [weeklyHours, setWeeklyHours] = useState<string>('15');
  const [weeks, setWeeks] = useState<string>('4');
  const [total, setTotal] = useState<number>(0);

  const handleCalculate = () => {
    if (!hourlyRate || !weeklyHours || !weeks) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(weeklyHours);
    const numberOfWeeks = parseFloat(weeks);

    if (rate <= 0 || hours <= 0 || numberOfWeeks <= 0) {
      toast.error('Os valores devem ser maiores que zero');
      return;
    }

    const calculatedTotal = calculateTotal(rate, hours, numberOfWeeks);
    setTotal(calculatedTotal);
    toast.success('Cálculo realizado com sucesso!', {
      className: 'bg-gray-800 text-gray-800',
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      <FeedbackForm />
      <div className="glass w-full max-w-md p-6 rounded-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Calculadora de Tabela
        </h1>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="input-glass pt-6"
              placeholder=" "
              min="0"
              step="0.01"
            />
            <label className="label-float">
              Valor por Hora (R$)
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
              className="input-glass pt-6"
              placeholder=" "
              min="1"
            />
            <label className="label-float">
              Horas Semanais
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              className="input-glass pt-6"
              placeholder=" "
              min="1"
            />
            <label className="label-float">
              Quantas Semanas
            </label>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="button-primary w-full"
        >
          Calcular Total
        </button>

        {total > 0 && (
          <div className="text-center pt-4">
            <p className="text-gray-700 font-medium">Total Calculado:</p>
            <p className="text-3xl font-bold text-gray-800">
              {formatCurrency(total)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
