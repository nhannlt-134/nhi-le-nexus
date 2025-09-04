import { useState } from "react";
import { InputField } from "./ui/input-field";
import { TextareaField } from "./ui/textarea-field";
import { GradientButton } from "./ui/gradient-button";
import { useToast } from "@/hooks/use-toast";

interface LivestreamFormData {
  name: string;
  email: string;
  phone: string;
  question: string;
  consent: boolean;
  webhookUrl: string;
}

export const LivestreamForm = () => {
  const [formData, setFormData] = useState<LivestreamFormData>({
    name: "",
    email: "",
    phone: "",
    question: "",
    consent: false,
    webhookUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setShowConsentError(true);
      return;
    } else {
      setShowConsentError(false);
    }

    if (!formData.webhookUrl) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập Zapier webhook URL để gửi đến Telegram",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(formData.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          question: formData.question,
          timestamp: new Date().toISOString(),
          type: "livestream_question",
          triggered_from: window.location.origin,
        }),
      });

      setIsSubmitted(true);
      toast({
        title: "Thành công!",
        description: "Câu hỏi đã được gửi đến Telegram. Nhi sẽ xem và trả lời sớm!",
      });
    } catch (error) {
      console.error("Error sending livestream form:", error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi câu hỏi. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4 font-vietnam">Đã gửi câu hỏi thành công! ✅</h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-vietnam">
          Cảm ơn bạn rất nhiều! Nhi sẽ xem qua và chọn những câu hỏi hay nhất cho buổi livestream sắp tới. Hẹn gặp lại bạn nhé!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
      <h2 className="text-3xl font-bold mb-4 font-vietnam">Đặt Câu Hỏi Livestream Cho Nhi Lê</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-vietnam">
        Có điều gì bạn luôn muốn hỏi Nhi trong buổi livestream sắp tới? Hãy để lại câu hỏi ở đây. Những câu hỏi hay nhất sẽ được chọn để trả lời trực tiếp!
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left">
        <div className="mb-4">
          <InputField
            type="url"
            placeholder="Zapier Webhook URL cho Telegram"
            value={formData.webhookUrl}
            onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 font-vietnam">Họ và tên</label>
          <InputField
            type="text"
            placeholder="Nguyễn Văn A"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 font-vietnam">Email</label>
          <InputField
            type="email"
            placeholder="bancua@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 font-vietnam">Số điện thoại</label>
          <InputField
            type="tel"
            placeholder="090..."
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 font-vietnam">Câu hỏi của bạn</label>
          <TextareaField
            rows={4}
            placeholder="Chị Nhi ơi, cho em hỏi..."
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
          />
        </div>
        <div className="mb-6 flex items-start">
          <input
            type="checkbox"
            className="h-5 w-5 mt-1 rounded border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            required
          />
          <label className="ml-3 text-sm text-gray-600 font-vietnam">
            Tôi đồng ý nhận thông tin, tin tức và các ưu đãi từ team Nhi Lê qua email và SĐT đã cung cấp.
          </label>
        </div>
        {showConsentError && (
          <div className="text-red-500 text-sm mb-4 text-center font-vietnam">
            Bạn cần đồng ý với điều khoản để tiếp tục.
          </div>
        )}
        <GradientButton 
          type="submit" 
          disabled={isLoading}
          className="w-full text-center"
        >
          {isLoading ? "Đang gửi..." : "Gửi câu hỏi ngay"}
        </GradientButton>
      </form>
    </div>
  );
};