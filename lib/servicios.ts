import {
  Sparkles,
  Salad,
  Pill,
  HeartPulse,
  FlaskConical,
  PersonStanding,
  type LucideIcon,
} from "lucide-react"

export type Servicio = {
  slug: string
  icon: LucideIcon
  titulo: string
  resumen: string
  descripcion: string[]
  beneficios: string[]
  imagen: string
}

export const servicios: Servicio[] = [
  {
    slug: "dermofarmacia",
    icon: Sparkles,
    titulo: "Dermofarmacia",
    resumen: "Asesoramiento experto en el cuidado de tu piel.",
    descripcion: [
      "Analizamos las necesidades de tu piel y te recomendamos la rutina y los productos dermocosméticos más adecuados para ti, ya sea para el rostro, el cuerpo o el cabello.",
      "Trabajamos con las principales marcas dermofarmacéuticas y te acompañamos en el tratamiento de problemas como el acné, la sequedad, la sensibilidad o el envejecimiento cutáneo.",
    ],
    beneficios: [
      "Diagnóstico personalizado de tu tipo de piel",
      "Rutinas adaptadas a cada necesidad",
      "Marcas dermocosméticas de confianza",
    ],
    imagen: "/servicio-dermo.png",
  },
  {
    slug: "nutricion-y-dietetica",
    icon: Salad,
    titulo: "Nutrición y dietética",
    resumen: "Consejo nutricional para mejorar tus hábitos.",
    descripcion: [
      "Te ayudamos a mejorar tu alimentación con consejos prácticos y complementos nutricionales adaptados a tus objetivos: control de peso, energía, digestión o rendimiento deportivo.",
      "Resolvemos tus dudas sobre suplementos, vitaminas y minerales para que tomes decisiones informadas y seguras para tu salud.",
    ],
    beneficios: [
      "Asesoramiento sobre complementos y vitaminas",
      "Recomendaciones según tus objetivos",
      "Seguimiento cercano y sin compromiso",
    ],
    imagen: "/servicio-nutricion.png",
  },
  {
    slug: "spd-sistema-personalizado-dosificacion",
    icon: Pill,
    titulo: "Sistema Personalizado de Dosificación (SPD)",
    resumen: "Tu medicación organizada por días y tomas.",
    descripcion: [
      "Preparamos tu medicación semanal en blísteres individuales organizados por día y hora de la toma, evitando olvidos y errores de dosificación.",
      "Un servicio especialmente útil para personas mayores, polimedicadas o cuidadores, que aporta seguridad y tranquilidad en el tratamiento.",
    ],
    beneficios: [
      "Evita olvidos y confusiones de dosis",
      "Ideal para tratamientos con varios medicamentos",
      "Mayor autonomía y seguridad",
    ],
    imagen: "/servicio-spd.png",
  },
  {
    slug: "control-tension-arterial",
    icon: HeartPulse,
    titulo: "Control de tensión arterial",
    resumen: "Medición y seguimiento de tu tensión.",
    descripcion: [
      "Realizamos mediciones de la tensión arterial en la farmacia y te ayudamos a interpretar los resultados y a llevar un seguimiento a lo largo del tiempo.",
      "Te ofrecemos consejos sobre hábitos de vida saludables y sobre cómo controlar tu tensión desde casa cuando sea necesario.",
    ],
    beneficios: [
      "Medición rápida y fiable",
      "Seguimiento de tus valores",
      "Consejos para el control diario",
    ],
    imagen: "/servicio-tension.png",
  },
  {
    slug: "formulacion-magistral",
    icon: FlaskConical,
    titulo: "Formulación magistral",
    resumen: "Preparados adaptados a cada paciente.",
    descripcion: [
      "Elaboramos fórmulas magistrales personalizadas a partir de la prescripción médica, adaptando la dosis, el formato y los componentes a las necesidades concretas de cada paciente.",
      "Un servicio especialmente valioso en dermatología, pediatría y en tratamientos donde el medicamento estándar no se ajusta a lo que necesitas.",
    ],
    beneficios: [
      "Preparados a medida según prescripción",
      "Dosis y formatos personalizados",
      "Control de calidad riguroso",
    ],
    imagen: "/servicio-formulacion.png",
  },
  {
    slug: "ortopedia-y-parafarmacia",
    icon: PersonStanding,
    titulo: "Ortopedia y parafarmacia",
    resumen: "Productos de apoyo para tu bienestar.",
    descripcion: [
      "Disponemos de una amplia selección de productos de ortopedia: medias de compresión, férulas, plantillas, collarines y material de apoyo para tu día a día.",
      "Te asesoramos para elegir el producto más adecuado a tu situación y, cuando sea necesario, te orientamos sobre productos a medida.",
    ],
    beneficios: [
      "Amplio catálogo de ortopedia",
      "Asesoramiento personalizado",
      "Productos de apoyo y bienestar",
    ],
    imagen: "/servicio-ortopedia.png",
  },
]

export function getServicio(slug: string) {
  return servicios.find((s) => s.slug === slug)
}
