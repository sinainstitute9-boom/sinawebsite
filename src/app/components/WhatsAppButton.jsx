"use client"

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923203400111?text=Hello%20I%20want%20course%20information"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <img src="/images/whatsapp.png" alt="WhatsApp" className="w-20 h-20" />
    </a>
  )
}