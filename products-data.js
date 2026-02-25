// =============================================
// PRODUCT DATABASE - All Products with Full Data
// =============================================

const productsDatabase = [
    // WINDOWS PRODUCTS
    {
        id: 1,
        slug: "windows-10-professional",
        name: "Windows 10 Professional License Key",
        category: "windows",
        price: 18.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/microsoft-windows.svg",
        shortDescription: "Genuine permanent license for Windows 10 Pro",
        description: `Windows 10 Professional is the ultimate solution for business professionals and creative enthusiasts. Get access to advanced features like Remote Desktop, Hyper-V, and BitLocker encryption. Perfect for developers, designers, and power users who need more than what Home offers.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Features include:
• Advanced security with Windows Defender
• Remote Desktop capabilities
• Hyper-V virtualization
• BitLocker encryption
• Group Policy management
• Professional networking tools`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 10 (64-bit & 32-bit)",
            activationType: "30-day activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "Permanent license",
            language: "Multiple languages"
        },
        requirements: {
            os: "Windows 10 (Build 1909 or higher)",
            ram: "2 GB RAM (64-bit)",
            disk: "20 GB available disk space",
            processor: "1 GHz processor or faster",
            internet: "Internet connection required for activation"
        },
        trust: [
            "100% Genuine Microsoft License",
            "One-time purchase, lifetime use",
            "Full technical support included",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 2,
        slug: "windows-11-professional",
        name: "Windows 11 Professional License Key",
        category: "windows",
        price: 25.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/microsoft-windows.svg",
        shortDescription: "Genuine permanent license for Windows 11 Pro",
        description: `Windows 11 Professional represents the future of computing with revolutionary design and performance. Experience a more productive desktop with Snap layouts, virtual desktops, and Microsoft Teams integration built-in.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Premium features:
• Redesigned modern interface
• Windows Copilot AI assistant
• Enhanced security with TPM 2.0
• Virtual desktops
• Snap layouts and groups
• DirectStorage for faster gaming`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 11 (64-bit only)",
            activationType: "Instant activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "Permanent license",
            language: "Multiple languages"
        },
        requirements: {
            os: "Windows 11",
            ram: "4 GB RAM (64-bit)",
            disk: "64 GB available disk space",
            processor: "1 GHz processor with SSE2 support",
            tpm: "TPM 2.0 required"
        },
        trust: [
            "Latest Windows version",
            "Revolutionary AI features",
            "Enterprise-grade security",
            "14-day money-back guarantee"
        ]
    },
    {
        id: 3,
        slug: "windows-10-home",
        name: "Windows 10 Home License Key",
        category: "windows",
        price: 16.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/microsoft-windows.svg",
        shortDescription: "Genuine permanent license for Windows 10 Home",
        description: `Windows 10 Home is perfect for everyday computing with all the essential features you need. Enjoy a familiar Windows experience with modern updates, security improvements, and seamless connectivity across your devices.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Key features:
• Cortana voice assistant
• Microsoft Edge browser
• Windows Defender antivirus
• OneDrive cloud storage integration
• Gaming readiness
• Regular security updates`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 10 (64-bit & 32-bit)",
            activationType: "30-day activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "Permanent license",
            language: "Multiple languages"
        },
        requirements: {
            os: "Windows 10 (Build 1909 or higher)",
            ram: "1 GB RAM (32-bit) / 2 GB RAM (64-bit)",
            disk: "16 GB available disk space",
            processor: "1 GHz processor",
            internet: "Internet connection required"
        },
        trust: [
            "Affordable Windows solution",
            "Perfect for home users",
            "Lifetime activation",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 4,
        slug: "windows-11-home",
        name: "Windows 11 Home License Key",
        category: "windows",
        price: 23.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/microsoft-windows.svg",
        shortDescription: "Genuine permanent license for Windows 11 Home",
        description: `Windows 11 Home brings the power of modern computing to your home. With faster performance, innovative tools, and beautiful design, Windows 11 Home is built for how you work and play today.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

What's included:
• Stunning new Start menu
• Windows Copilot AI assistant
• Enhanced gaming features
• Multiple desktops
• Snap layouts for productivity
• Microsoft Teams integration`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 11 (64-bit only)",
            activationType: "Instant activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "Permanent license",
            language: "Multiple languages"
        },
        requirements: {
            os: "Windows 11",
            ram: "4 GB RAM minimum",
            disk: "64 GB SSD recommended",
            processor: "1 GHz processor",
            tpm: "TPM 2.0 required"
        },
        trust: [
            "Modern Windows experience",
            "AI-powered features",
            "Future-proof operating system",
            "14-day money-back guarantee"
        ]
    },
    {
        id: 5,
        slug: "windows-10-enterprise",
        name: "Windows 10 Enterprise License Key",
        category: "windows",
        price: 36.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/microsoft-windows.svg",
        shortDescription: "Genuine permanent license for Windows 10 Enterprise",
        description: `Windows 10 Enterprise is designed for large organizations with advanced security and management capabilities. Deploy with confidence using the most comprehensive Windows platform for enterprise environments.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Enterprise-grade features:
• Long-term servicing branch
• Advanced security controls
• Deployment tools
• Update for Business
• Branch caching
• Direct Access technology`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 10 Enterprise (64-bit)",
            activationType: "Volume activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "Enterprise license",
            language: "Multiple languages"
        },
        requirements: {
            os: "Windows 10 Enterprise Edition",
            ram: "2 GB RAM (64-bit)",
            disk: "20 GB available disk space",
            processor: "1.4 GHz 64-bit compatible",
            notes: "Requires product key for enterprise activation"
        },
        trust: [
            "Enterprise security features",
            "Volume licensing available",
            "Advanced management tools",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 6,
        slug: "windows-11-enterprise",
        name: "Windows 11 Enterprise License Key",
        category: "windows",
        price: 45.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/microsoft-windows.svg",
        shortDescription: "Genuine permanent license for Windows 11 Enterprise",
        description: `Windows 11 Enterprise provides the most advanced security, management, and productivity capabilities for enterprise organizations. Build a secure, modern workplace with cutting-edge technology and flexible deployment options.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Enterprise advantages:
• Advanced threat protection
• Identity and access management
• Information protection
• Cloud integration
• Flexible update channels
• Intelligence services`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 11 Enterprise (64-bit)",
            activationType: "Volume or BYOL activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "Enterprise license",
            language: "Multiple languages"
        },
        requirements: {
            os: "Windows 11 Enterprise",
            ram: "4 GB RAM minimum",
            disk: "64 GB SSD",
            processor: "1.4 GHz 64-bit compatible",
            tpm: "TPM 2.0 required"
        },
        trust: [
            "Latest enterprise OS",
            "Government-grade security",
            "Volume licensing support",
            "14-day money-back guarantee"
        ]
    },

    // MICROSOFT OFFICE PRODUCTS
    {
        id: 7,
        slug: "office-2021-professional-plus",
        name: "Office 2021 Professional Plus License Key For Windows",
        category: "office",
        price: 24.99,
        image: "https://image2url.com/r2/default/images/1771902834848-ab45d165-6bea-435a-b696-762b93abcde4.png",
        shortDescription: "Complete Office suite including Word, Excel, PowerPoint & more",
        description: `Office 2021 Professional Plus is the industry standard suite for professionals. Create, collaborate, and communicate with the latest versions of Word, Excel, PowerPoint, Outlook, Access, and Publisher.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Professional tools included:
• Word - Professional document creation
• Excel - Advanced data analysis
• PowerPoint - Stunning presentations
• Outlook - Email and calendar management
• Access - Database solutions
• Publisher - Professional design tools
• Teams - Integrated collaboration`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 10/11",
            activationType: "Instant activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "One-time purchase",
            language: "English and multiple languages"
        },
        requirements: {
            os: "Windows 10 or Windows 11",
            ram: "4 GB RAM",
            disk: "10 GB available disk space",
            processor: "Intel Pentium 4 GHz or equivalent",
            internet: "Internet required for installation"
        },
        trust: [
            "Complete professional suite",
            "Desktop and online access",
            "Lifetime activation",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 8,
        slug: "office-2019-professional-plus",
        name: "Office 2019 Professional Plus License Key For Windows",
        category: "office",
        price: 19.99,
        image: "https://image2url.com/r2/default/images/1771902834848-ab45d165-6bea-435a-b696-762b93abcde4.png",
        shortDescription: "Professional Office 2019 suite for Windows",
        description: `Office 2019 Professional Plus delivers powerful productivity tools designed for professionals. Whether you're managing data in Excel, presenting to clients with PowerPoint, or managing emails in Outlook, Office 2019 has you covered.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

What's included:
• Word - Rich document editing
• Excel - Powerful spreadsheets
• PowerPoint - Professional presentations
• Outlook - Communications hub
• Access - Database management
• Publisher - Desktop publishing`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 10",
            activationType: "Instant activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "One-time purchase",
            language: "English and supported languages"
        },
        requirements: {
            os: "Windows 10 (Build 1909+)",
            ram: "4 GB RAM",
            disk: "10 GB available space",
            processor: "2 GHz processor",
            internet: "Internet required for initial setup"
        },
        trust: [
            "Proven Office version",
            "Stable and reliable",
            "Permanent license",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 9,
        slug: "office-365-professional-plus",
        name: "Office 365 Professional Plus Account For Windows & Mac",
        category: "office",
        price: 22.99,
        image: "https://image2url.com/r2/default/images/1771902834848-ab45d165-6bea-435a-b696-762b93abcde4.png",
        shortDescription: "Cloud-based Office with 1TB OneDrive storage - works on all devices",
        description: `Office 365 Professional Plus is a subscription-based service that gives you access to premium Office applications on multiple devices. With cloud synchronization and 1TB of OneDrive storage, your work is always accessible.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Cloud productivity features:
• Access Office apps on any device
• 1TB OneDrive cloud storage
• Real-time collaboration
• Automatic updates
• Email and calendar (1TB mailbox)
• Professional design tools
• Advanced security features`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows, Mac, iOS, Android",
            activationType: "Cloud-based activation",
            deliveryType: "Instant account setup",
            licenseType: "Annual subscription",
            language: "Multiple languages supported"
        },
        requirements: {
            os: "Windows 10+ or macOS 10.10+",
            ram: "2 GB RAM",
            disk: "4 GB available space",
            processor: "Intel Pentium 1 GHz",
            internet: "Continuous internet connection"
        },
        trust: [
            "Multi-device access",
            "Cloud storage included",
            "Always updated",
            "14-day money-back guarantee"
        ]
    },
    {
        id: 10,
        slug: "office-2016-professional-plus",
        name: "Office 2016 Professional Plus License Key For Windows",
        category: "office",
        price: 15.99,
        image: "https://image2url.com/r2/default/images/1771902834848-ab45d165-6bea-435a-b696-762b93abcde4.png",
        shortDescription: "Classic Office 2016 Professional Plus for Windows",
        description: `Office 2016 Professional Plus is a reliable, feature-rich suite perfect for businesses and professionals. With familiar tools and seamless cloud integration through OneDrive and SharePoint, you can work collaboratively.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Core applications:
• Word 2016 - Document creation
• Excel 2016 - Data analysis
• PowerPoint 2016 - Presentations
• Outlook 2016 - Email management
• Access 2016 - Database tools
• Publisher 2016 - Publishing`,
        specs: {
            brand: "Microsoft",
            compatibility: "Windows 7/8/10",
            activationType: "Standard activation",
            deliveryType: "Delivery time - 5 - 30 min",
            licenseType: "One-time purchase",
            language: "English and other languages"
        },
        requirements: {
            os: "Windows Vista or later",
            ram: "2 GB RAM",
            disk: "3 GB available space",
            processor: "500 MHz processor",
            internet: "Internet access for setup"
        },
        trust: [
            "Time-tested reliability",
            "Still widely supported",
            "Lifetime license",
            "30-day money-back guarantee"
        ]
    },

    // ADOBE PRODUCTS
    {
        id: 11,
        slug: "adobe-acrobat-pro-dc-2022",
        name: "Adobe Acrobat Pro DC 2022 With Lifetime License For Windows",
        category: "adobe",
        price: 50.99,
        image: "https://image2url.com/r2/default/images/1771902679646-a95b3950-053b-4161-acde-7f95269264ad.png",
        shortDescription: "Professional PDF editing and management with lifetime activation",
        description: `Adobe Acrobat Pro DC 2022 is the complete PDF solution for professionals. Create, edit, sign, and secure PDFs with industry-leading tools. Perfect for business professionals, lawyers, and anyone working with documents daily.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Professional PDF features:
• Advanced PDF editing
• E-signature capabilities
• Form creation and distribution
• PDF optimization and compression
• OCR (Optical Character Recognition)
• Batch processing
• Document security and encryption`,
        specs: {
            brand: "Adobe",
            compatibility: "Windows 10/11 (64-bit)",
            activationType: "Lifetime license",
            deliveryType: "Instant download",
            licenseType: "Perpetual license",
            language: "English and international languages"
        },
        requirements: {
            os: "Windows 10/11 (64-bit)",
            ram: "4 GB RAM minimum (8 GB recommended)",
            disk: "5 GB available disk space",
            processor: "Intel or AMD processor (2 GHz or higher)",
            graphics: "GPU with 1GB VRAM recommended"
        },
        trust: [
            "Industry standard PDF tool",
            "Professional security features",
            "Lifetime activation",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 12,
        slug: "adobe-photoshop-2022",
        name: "Adobe Photoshop 2022 With Lifetime License For Windows",
        category: "adobe",
        price: 50.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/adobe-photoshop.svg",
        shortDescription: "Professional image editing software with lifetime activation",
        description: `Adobe Photoshop 2022 is the world's leading image editing software. From photographers to graphic designers, Photoshop is the tool of choice for professional image editing, digital art, and visual communication.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Creative possibilities:
• Advanced image editing
• AI-powered tools (Neural Filters)
• Content-Aware Fill
• Generative Expand
• 3D design capabilities
• Video editing
• Cloud collaboration`,
        specs: {
            brand: "Adobe",
            compatibility: "Windows 10/11 (64-bit)",
            activationType: "Lifetime license",
            deliveryType: "Instant download",
            licenseType: "Perpetual license",
            language: "English and international languages"
        },
        requirements: {
            os: "Windows 10/11 (64-bit)",
            ram: "8 GB RAM (16 GB recommended)",
            disk: "4 GB available disk space",
            processor: "Intel Core i7 or equivalent",
            graphics: "GPU with 2GB VRAM"
        },
        trust: [
            "Industry-leading image editor",
            "AI-assisted editing",
            "Professional-grade features",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 13,
        slug: "adobe-after-effects-2022",
        name: "Adobe After Effects 2022 With Lifetime License For Windows",
        category: "adobe",
        price: 0.5,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/adobe-after-effects.svg",
        shortDescription: "Motion graphics and visual effects software with lifetime activation",
        description: `Adobe After Effects 2022 is the standard for motion graphics and visual effects. Create stunning animations, add visual effects to video, and bring your creative vision to life with professional-grade tools.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Visual effects power:
• Motion graphics design
• Visual effects compositing
• 3D animation
• Keyframe animation
• Effect presets library
• Cinema 4D integration
• Dynamic Link support`,
        specs: {
            brand: "Adobe",
            compatibility: "Windows 10/11 (64-bit)",
            activationType: "Lifetime license",
            deliveryType: "Instant download",
            licenseType: "Perpetual license",
            language: "English and international languages"
        },
        requirements: {
            os: "Windows 10/11 (64-bit)",
            ram: "16 GB RAM minimum (32 GB recommended)",
            disk: "8 GB available disk space",
            processor: "Intel Core i9 or equivalent",
            graphics: "GPU with 4GB VRAM"
        },
        trust: [
            "Professional animation software",
            "Industry standard VFX",
            "Lifetime license",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 14,
        slug: "adobe-premiere-pro-2022",
        name: "Adobe Premiere Pro 2022 With Lifetime License For Windows",
        category: "adobe",
        price: 49.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/adobe-premiere.svg",
        shortDescription: "Professional video editing software with lifetime activation",
        description: `Adobe Premiere Pro 2022 is the industry standard for video editing. Used by professionals worldwide, Premiere Pro provides powerful editing tools, effects, and color correction capabilities for any video project.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Video editing features:
• Multi-format timeline editing
• Advanced color correction
• Professional effects library
• Audio editing and mixing
• Dynamic Link support
• Hardware acceleration
• Essential Graphics panel`,
        specs: {
            brand: "Adobe",
            compatibility: "Windows 10/11 (64-bit)",
            activationType: "Lifetime license",
            deliveryType: "Instant download",
            licenseType: "Perpetual license",
            language: "English and international languages"
        },
        requirements: {
            os: "Windows 10/11 (64-bit)",
            ram: "16 GB RAM minimum (24 GB recommended)",
            disk: "10 GB available disk space",
            processor: "Intel Core i7 or equivalent",
            graphics: "GPU with 4GB VRAM (6GB for 4K)"
        },
        trust: [
            "Professional video editing",
            "Hollywood industry standard",
            "Lifetime license",
            "30-day money-back guarantee"
        ]
    },
    {
        id: 15,
        slug: "adobe-illustrator-2022",
        name: "Adobe Illustrator 2022 With Lifetime License For Windows",
        category: "adobe",
        price: 49.99,
        image: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/adobe-illustrator.svg",
        shortDescription: "Vector graphics design software with lifetime activation",
        description: `Adobe Illustrator 2022 is the industry standard for vector graphics design. Create logos, illustrations, typography, and complex artwork with precision and control. Perfect for designers, artists, and creative professionals.

🚀 DELIVERY: Your license key will be delivered via email within 5-30 minutes after successful payment.

Vector design capabilities:
• Precise vector drawing tools
• AI-assisted design (Super Nudge)
• Typography excellence
• Pattern creation
• Symbol libraries
• 3D effects
• SVG support`,
        specs: {
            brand: "Adobe",
            compatibility: "Windows 10/11 (64-bit)",
            activationType: "Lifetime license",
            deliveryType: "Instant download",
            licenseType: "Perpetual license",
            language: "English and international languages"
        },
        requirements: {
            os: "Windows 10/11 (64-bit)",
            ram: "8 GB RAM (16 GB recommended)",
            disk: "3 GB available disk space",
            processor: "Intel Core i5 or equivalent",
            graphics: "GPU with 2GB VRAM"
        },
        trust: [
            "Industry-leading vector editor",
            "Precision design tools",
            "Lifetime license",
            "30-day money-back guarantee"
        ]
    }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productsDatabase;
}
