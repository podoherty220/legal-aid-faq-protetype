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
        answer: "Legal Aid is help to pay for a lawyer or court case if you have a family problem. It can help with things like divorce, children, or safety from abuse."
      },
      {
        question: "Do I have to pay anything?",
        answer: "Some people get Legal Aid for free. Others may have to pay a little bit, depending on how much money they have."
      }
    ]
  },
  // Other languages can go here...
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
                  content.faqs.map((faq) => `${faq.question}\\n${faq.answer}\\n\\n`).join("\n")
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
