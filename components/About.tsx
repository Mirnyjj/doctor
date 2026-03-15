"use client";

import { motion } from "framer-motion";
import { FaAward } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";

const stats = [
  { icon: GiLovers, value: "100+", label: "Довольных клиентов" },
  { icon: FaAward, value: "3 года", label: "Опыта работы" },
  {
    icon: FaUserDoctor,
    value: "10+",
    label: "Пройдено дополнительного обучения",
  },
  { icon: FaHeartbeat, value: "100%", label: "Любви к делу" },
];

export function About() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Обо мне
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Привет! Я Анастасия – профессиональный nail-мастер с огромной
            любовью к своему делу. Для меня каждый маникюр – это не просто
            работа, а создание маленького шедевра, который будет радовать вас
            каждый день.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative">
                    <div className="inline-flex p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-pink-400" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              💎 Премиум материалы
            </h3>
            <p className="text-white/70">
              Использую только профессиональную косметику и материалы ведущих
              мировых брендов
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              ✨ Индивидуальный подход
            </h3>
            <p className="text-white/70">
              Каждый дизайн создается с учетом ваших пожеланий и особенностей
              ногтей
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-xl rounded-3xl p-8 border border-orange-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎨 Творческий подход
            </h3>
            <p className="text-white/70">
              Следую всем трендам nail-арта и создаю уникальные авторские
              дизайны
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
