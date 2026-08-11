import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/contact", form);
      toast.success("Message sent! We'll reach out within 24 hours.");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full glass rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/60 transition-colors bg-transparent";

  return (
    <div className="min-h-screen pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-400 font-mono text-xs uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-4">
            Let's Build Together
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Tell us about your project and we'll get back to you within 24
            hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            {[
              {
                icon: "📍",
                title: "Office",
                lines: ["Madiwala", "Bangalore, KA 560068"],
              },
              {
                icon: "📧",
                title: "Email",
                lines: ["hello@inseirou.in", "support@inseirou.in"],
              },
              {
                icon: "📞",
                title: "Phone",
                lines: ["+91 98765 43210", "Mon–Sat, 9am–7pm IST"],
              },
            ].map((i) => (
              <div key={i.title} className="flex gap-4">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {i.icon}
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{i.title}</p>
                  {i.lines.map((l) => (
                    <p key={l} className="text-slate-400 text-sm">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={submit} className="glass rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handle}
                  placeholder="Your Name"
                  className={inputCls}
                />
                <input
                  required
                  name="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="Email Address"
                  type="email"
                  className={inputCls}
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handle}
                  placeholder="Phone Number"
                  className={inputCls}
                />
                <input
                  name="company"
                  value={form.company}
                  onChange={handle}
                  placeholder="Company Name"
                  className={inputCls}
                />
              </div>
              <select
                name="service"
                value={form.service}
                onChange={handle}
                className={inputCls}
              >
                <option value="">Select a Service</option>
                {[
                  "Web Development",
                  "Mobile App",
                  "UI/UX Design",
                  "Cloud Solutions",
                  "DevOps",
                  "Other",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handle}
                rows={5}
                placeholder="Tell us about your project..."
                className={`${inputCls} resize-none`}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-200 hover:glow hover:scale-[1.02] text-sm"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
