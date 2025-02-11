
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Feedback = {
  name: string;
  rating: number;
  suggestion: string;
  timestamp: string;
};

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [suggestion, setSuggestion] = useState('');

  const saveFeedback = () => {
    if (!name || !suggestion) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    const feedback: Feedback = {
      name,
      rating,
      suggestion,
      timestamp: new Date().toISOString(),
    };

    // Get existing feedback from localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('calculatorFeedback') || '[]');
    
    // Add new feedback
    localStorage.setItem(
      'calculatorFeedback',
      JSON.stringify([...existingFeedback, feedback])
    );

    toast.success('Obrigado pelo seu feedback!');
    setName('');
    setRating(5);
    setSuggestion('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute top-4 right-4 text-sm text-gray-600 hover:text-gray-800"
        >
          Ajude-nos
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#FDE1D3] via-[#FFE29F] to-[#FEF7CD] border-none shadow-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1A1F2C] text-xl font-semibold">Seu Feedback</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#403E43] font-medium">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/70 backdrop-blur-sm border-[#403E43]/20 focus:border-[#403E43]/40 text-[#1A1F2C]"
              placeholder="Seu nome"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-[#403E43] font-medium">
              Avaliação (1-5)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  variant={rating === num ? 'default' : 'outline'}
                  onClick={() => setRating(num)}
                  className={`flex-1 ${
                    rating === num 
                    ? 'bg-[#EBA1B5] hover:bg-[#EBA1B5]/90 text-white' 
                    : 'bg-white/70 hover:bg-[#EBA1B5]/10 text-[#403E43] border-[#403E43]/20'
                  }`}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="suggestion" className="text-[#403E43] font-medium">
              Sugestões
            </Label>
            <Textarea
              id="suggestion"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="bg-white/70 backdrop-blur-sm border-[#403E43]/20 focus:border-[#403E43]/40 min-h-[100px] text-[#1A1F2C]"
              placeholder="Suas sugestões para melhorar a calculadora"
            />
          </div>
        </div>
        <Button 
          onClick={saveFeedback} 
          className="w-full bg-[#EBA1B5] hover:bg-[#EBA1B5]/90 text-white font-semibold"
        >
          Enviar Feedback
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
