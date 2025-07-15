import { useState } from "react";
import { Download, Printer } from "lucide-react";
import { saveAs } from "file-saver";

const translations = {
  en: {
    title: "Easy Read: Legal Aid for Family Problems",
    print: "Print",
    download: "Download",
    faqs: [
      {
        question: "What is Legal Aid?",
        answer:
          "Legal Aid is help to pay for a lawyer or court case if you have a family problem. It can help with things like divorce, children, or safety from abuse."
      },
      {
        question: "Do I have to pay anything?",
        answer:
          "Some people get Legal Aid for free. Others may have to pay a little bit, depending on how much money they have."
      },
      {
        question: "What family problems does Legal Aid help with?",
        answer:
          "Legal Aid helps with divorce, seeing your children, staying safe from abuse, or getting money to help support children."
      },
      {
        question: "How do I apply for Legal Aid?",
        answer:
          "You talk to a family solicitor. They help you fill in the form and send it in."
      },
      {
        question: "What happens after I apply?",
        answer:
          "You wait a few weeks. If Legal Aid says yes, your solicitor can start helping you."
      }
    ]
  },
  pl: {
    title: "Łatwy język: Pomoc prawna w sprawach rodzinnych",
    print: "Drukuj",
    download: "Pobierz",
    faqs: [
      {
        question: "Czym jest pomoc prawna?",
        answer:
          "Pomoc prawna to wsparcie w opłaceniu prawnika lub sprawy sądowej, jeśli masz problem rodzinny. Może pomóc w rozwodzie, opiece nad dziećmi lub ochronie przed przemocą."
      },
      {
        question: "Czy muszę coś płacić?",
        answer:
          "Niektórzy otrzymują pomoc prawną za darmo. Inni mogą zapłacić trochę, w zależności od dochodów."
      },
      {
        question: "W jakich sprawach rodzinnych pomaga pomoc prawna?",
        answer:
          "Pomoc prawna pomaga w rozwodzie, kontaktach z dziećmi, ochronie przed przemocą lub uzyskaniu wsparcia finansowego."
      },
      {
        question: "Jak złożyć wniosek o pomoc prawną?",
        answer:
          "Porozmawiaj z prawnikiem od spraw rodzinnych. On pomoże ci wypełnić formularz i go wysłać."
      },
      {
        question: "Co się dzieje po złożeniu wniosku?",
        answer:
          "Czekasz kilka tygodni. Jeśli pomoc prawna zostanie przyznana, prawnik może rozpocząć pomoc."
      }
    ]
  },
  ar: {
    title: "قراءة مبسطة: المساعدة القانونية في مشاكل الأسرة",
    print: "طباعة",
    download: "تحميل",
    faqs: [
      {
        question: "ما هي المساعدة القانونية؟",
        answer:
          "المساعدة القانونية هي دعم لدفع أجر المحامي أو القضية في المحكمة إذا كانت لديك مشكلة عائلية. يمكن أن تساعد في الطلاق، الأطفال، أو الحماية من العنف."
      },
      {
        question: "هل يجب أن أدفع شيئًا؟",
        answer:
          "بعض الأشخاص يحصلون على المساعدة القانونية مجانًا. البعض الآخر قد يدفع مبلغًا صغيرًا حسب دخله."
      },
      {
        question: "ما المشاكل الأسرية التي تغطيها المساعدة القانونية؟",
        answer:
          "تساعد المساعدة القانونية في الطلاق، رؤية الأطفال، الحماية من العنف، أو الحصول على دعم مالي."
      },
      {
        question: "كيف أقدم طلبًا للحصول على المساعدة القانونية؟",
        answer:
          "تتحدث مع محامٍ مختص في شؤون الأسرة. سيساعدك في تعبئة النموذج وإرساله."
      },
      {
        question: "ماذا يحدث بعد تقديم الطلب؟",
        answer:
          "تنتظر لبضعة أسابيع. إذا تمت الموافقة على المساعدة القانونية، يمكن لمحاميك البدء بمساعدتك."
      }
    ]
  }
};

export default function Home() {
  const [language, setLanguage] = useState("en");
  const content = translations[language];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <select
          className="border rounded px-2 py-1"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="pl">Polski</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {content.faqs.map((faq, index) => (
        <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2">
          <p className="font-bold text-lg">{faq.question}</p>
          <p className="text-base mt-2">{faq.answer}</p>
        </div>
      ))}

      <div className="flex gap-4">
        <button onClick={() => window.print()} className="px-4 py-2 bg-blue-500 text-white rounded">
          <Printer className="inline-block w-4 h-4 mr-2" />
          {content.print}
        </button>

        <button
          onClick={() => {
            const blob = new Blob(
              [
                `${content.title}\\n\\n` +
                  content.faqs.map((faq) => `${faq.question}\\n${faq.answer}\\n\\n`).join(\"\\n\")
              ],
              { type: "text/plain;charset=utf-8" }
            );
            saveAs(blob, `legal_aid_easy_read_${language}.txt`);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          <Download className="inline-block w-4 h-4 mr-2" />
          {content.download}
        </button>
      </div>
    </div>
  );
}
