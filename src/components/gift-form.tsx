import { useState } from "react";
import { InputField } from "./ui/input-field";
import { GradientButton } from "./ui/gradient-button";
import { useToast } from "@/hooks/use-toast";

interface GiftFormData {
  name: string;
  email: string;
  webhookUrl: string;
}

export const GiftForm = () => {
  const [formData, setFormData] = useState<GiftFormData>({
    name: "",
    email: "",
    webhookUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.webhookUrl) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập Zapier webhook URL để gửi email",
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
          timestamp: new Date().toISOString(),
          type: "gift_request",
          triggered_from: window.location.origin,
        }),
      });

      setIsSubmitted(true);
      toast({
        title: "Thành công!",
        description: "Yêu cầu đã được gửi đến email service. Kiểm tra lại email của bạn!",
      });
    } catch (error) {
      console.error("Error sending gift form:", error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi form. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4 font-vietnam">Cảm ơn bạn đã đăng ký! 🎉</h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-vietnam">
          Món quà đang trên đường đến với email của bạn. Hãy kiểm tra hộp thư đến (và cả mục quảng cáo/spam) nhé!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
      <h2 className="text-3xl font-bold mb-4 font-vietnam">Món Quà Đặc Biệt Dành Riêng Cho Bạn!</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-vietnam">
        Nhận ngay Ebook <strong>"5 Bước Xây Dựng Thói Quen Tích Cực"</strong> mà mình đã đúc kết để bắt đầu hành trình thay đổi bản thân nhé!
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <InputField
            type="url"
            placeholder="Zapier Webhook URL cho email"
            value={formData.webhookUrl}
            onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <InputField
            type="text"
            placeholder="Tên của bạn"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <InputField
            type="email"
            placeholder="Địa chỉ email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <GradientButton 
          type="submit" 
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? "Đang gửi..." : "💌 Gửi quà cho tôi ngay!"}
        </GradientButton>
      </form>
    </div>
  );
};