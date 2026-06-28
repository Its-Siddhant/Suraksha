# 🛡️ Suraksha — Women Safety & Emergency Response Platform

![Suraksha Banner](https://img.shields.io/badge/Suraksha-Women%20Safety%20Platform-red?style=for-the-badge&logo=shield)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

> **Suraksha** (सुरक्षा) means *Protection* in Hindi. This platform is built to empower women with real-time emergency tools, instant SOS alerts, and direct connectivity with law enforcement.

---

## 🚨 Live Demo

🔗 **[https://suraksha-project.vercel.app](https://suraksha-project.vercel.app)**

**Police Dashboard Login:**
- Username: `police`
- Password: `admin123`

---

## ✨ Features

### 🆘 Emergency SOS
- One-tap SOS button that instantly alerts nearby authorities
- Real-time GPS location detection and sharing
- Live location displayed on interactive map in police dashboard
- Emergency contact quick-dial (100, 112, 101)
- Nearby police station listing with distance and availability status

### 🗺️ Live Location Mapping
- Integrated **Leaflet.js + OpenStreetMap** (no API key required)
- Real-time red pulsing marker at exact SOS location
- One-click **"Open in Google Maps"** for navigation
- GPS coordinates captured and stored with every SOS alert

### 👮 Police Command Dashboard
- Secure login for law enforcement personnel
- Real-time crime report management
- Auto-refreshes every 3 seconds for live SOS alerts
- Filter reports by status: SOS, Received, In Action, Resolved
- Update report status with persistent storage
- Stats overview: Total Reports, Active SOS, In Progress, Resolved

### 📊 Crime Reporting
- Submit detailed crime reports with category, location, and description
- AI-powered categorization using HuggingFace Transformers
- Track report status in real-time

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Frontend framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI component library |
| **React Router DOM** | Client-side routing |
| **Leaflet.js** | Interactive maps |
| **OpenStreetMap** | Free map tiles |
| **HuggingFace Transformers** | AI categorization |
| **TanStack Query** | Data fetching & state |
| **React Hook Form + Zod** | Form validation |
| **Recharts** | Data visualization |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Its-Siddhant/Suraksha.git

# Navigate to project directory
cd Suraksha

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📱 Pages & Routes

| Route | Description |
|---|---|
| `/` | Home / Landing page |
| `/sos` | Emergency SOS page |
| `/report` | Crime reporting form |
| `/dashboard` | Police command center |
| `/resources` | Safety resources |

---

## 🔐 How It Works

1. **User presses SOS** → GPS coordinates captured instantly
2. **Alert saved** → Stored with real timestamp and location
3. **Police dashboard** → Auto-refreshes and shows new alert at top
4. **Map opens** → Officer sees exact location with red pulsing marker
5. **Status updated** → Officer marks alert as In Action → Resolved

---

## 🌍 Deployment

This project is live on **Vercel**:
🔗 [https://suraksha-project.vercel.app](https://suraksha-project.vercel.app)

To deploy your own instance:
1. Fork this repository
2. Go to [vercel.com](https://vercel.com)
3. Import the forked repo
4. Vercel auto-detects Vite — click Deploy

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AambingFeature`)
5. Open a Pull Request

---

## ⚠️ Disclaimer

This platform is built for demonstration and educational purposes. The SOS feature uses real GPS and localStorage for simulation. In a production environment, this should be connected to a real backend with database, authentication, and emergency service APIs.

---

## 👨‍💻 Developer

**Siddhant**
- GitHub: [@Its-Siddhant](https://github.com/Its-Siddhant)
- Live Project: [suraksha-project.vercel.app](https://suraksha-project.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <strong>Built with ❤️ for Women Safety</strong>
  <br/>
  <sub>Suraksha — Because every woman deserves to feel safe</sub>
</div>
