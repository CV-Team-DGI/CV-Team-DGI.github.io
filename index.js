// Store certifications
let certifications = [];

const tabs = document.querySelector('md-tabs');
const panels = document.querySelectorAll('.tab-panel');

tabs.addEventListener('change', () => {
    panels.forEach(panel => {
        panel.hidden = true;
    });
    const activeTab = tabs.activeTab;
    if (activeTab) {
        const panelId = activeTab.getAttribute('aria-controls');
        const activePanel = document.getElementById(panelId);
        if (activePanel) {
            activePanel.hidden = false;
        }
    }
});

// Show the first panel by default
if (tabs.activeTab) {
    const panelId = tabs.activeTab.getAttribute('aria-controls');
    const activePanel = document.getElementById(panelId);
    if (activePanel) {
        activePanel.hidden = false;
    }
} else {
    // If no tab is active by default, activate the first one.
    const firstTab = document.querySelector('md-primary-tab');
    if (firstTab) {
        firstTab.active = true;
        const panelId = firstTab.getAttribute('aria-controls');
        const activePanel = document.getElementById(panelId);
        if (activePanel) {
            activePanel.hidden = false;
        }
    }
}

// Add certification button handler
document.getElementById('add-certification-btn').addEventListener('click', function() {
  const container = document.getElementById('certifications-container');
  const newEntry = document.createElement('div');
  newEntry.className = 'certification-entry';
  newEntry.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <h3 style="font-size: 0.875rem; font-weight: 500;">Certification ${container.children.length + 1}</h3>
      <md-icon-button class="remove-cert-btn">
        <md-icon>delete</md-icon>
      </md-icon-button>
    </div>
    <md-filled-text-field label="Certification Name" class="cert-name" style="width: 100%"></md-filled-text-field>
    <md-filled-text-field label="Platform/Issuer" class="cert-platform" style="width: 100%"></md-filled-text-field>
    <div class="form-row">
      <md-filled-text-field label="Date Obtained" class="cert-date" type="date"></md-filled-text-field>
      <md-filled-text-field label="Certificate URL (optional)" class="cert-url" type="url"></md-filled-text-field>
    </div>
  `;
  
  container.appendChild(newEntry);
  
  // Add remove handler
  newEntry.querySelector('.remove-cert-btn').addEventListener('click', function() {
    newEntry.remove();
  });
});

// Function to collect certifications
function collectCertifications() {
  certifications = [];
  document.querySelectorAll('.certification-entry').forEach(entry => {
    const name = entry.querySelector('.cert-name').value;
    const platform = entry.querySelector('.cert-platform').value;
    const date = entry.querySelector('.cert-date').value;
    const url = entry.querySelector('.cert-url').value;
    
    if (name && platform) {
      certifications.push({ name, platform, date, url });
    }
  });
  return certifications;
}

const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Determine language and translation helper
    const lang = document.documentElement.lang || 'en';
    const t = (key, fallback) => (window.translations && window.translations[lang] && window.translations[lang][key]) || fallback;

    // Get all form values using IDs
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value || '';
    const phone = document.getElementById('phone').value || '';
    const address = document.getElementById('address').value || '';
    const linkedin = document.getElementById('linkedin').value || '';

    const jobTitle = document.getElementById('jobTitle').value || '';
    const company = document.getElementById('company').value || '';
    const expStartDate = document.getElementById('expStartDate').value || '';
    const expEndDate = document.getElementById('expEndDate').value || 'Present';
    const expDescription = document.getElementById('expDescription').value || '';

    const degree = document.getElementById('degree').value || '';
    const school = document.getElementById('school').value || '';
    const eduStartDate = document.getElementById('eduStartDate').value || '';
    const eduEndDate = document.getElementById('eduEndDate').value || '';
    const gpa = document.getElementById('gpa').value || '';

    const skills = document.getElementById('skills').value || '';
    
    // Get certifications
    const certs = collectCertifications();
    
    // Get current theme and format
    const themeElement = document.querySelector('.theme-option.selected');
    const currentTheme = themeElement ? themeElement.getAttribute('data-theme') : 'classic';
    const currentFormat = themeElement ? themeElement.getAttribute('data-format') : 'traditional';
    
    // Theme colors
    const themeColors = {
        classic: { primary: [25, 118, 210], secondary: [33, 150, 243], light: [100, 181, 246] },
        modern: { primary: [123, 31, 162], secondary: [156, 39, 176], light: [186, 104, 200] },
        elegant: { primary: [56, 142, 60], secondary: [76, 175, 80], light: [129, 199, 132] },
        bold: { primary: [211, 47, 47], secondary: [244, 67, 54], light: [229, 115, 115] },
        creative: { primary: [245, 124, 0], secondary: [255, 152, 0], light: [255, 183, 77] }
    };
    
    const selectedColor = themeColors[currentTheme] || themeColors.classic;

    let yPos = 20;
    const leftMargin = 20;
    const pageWidth = 190;

    // Header - Name with theme color
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(selectedColor.primary[0], selectedColor.primary[1], selectedColor.primary[2]);
    doc.text(fullName, leftMargin, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 8;

    // Contact Information
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    let contactInfo = [email, phone, address].filter(item => item).join(' | ');
    if (contactInfo) {
        doc.text(contactInfo, leftMargin, yPos);
        yPos += 5;
    }
    if (linkedin) {
        doc.setTextColor(selectedColor.secondary[0], selectedColor.secondary[1], selectedColor.secondary[2]);
        doc.text(linkedin, leftMargin, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
    }

    yPos += 3;
    doc.setLineWidth(0.5);
    doc.setDrawColor(selectedColor.primary[0], selectedColor.primary[1], selectedColor.primary[2]);
    doc.line(leftMargin, yPos, pageWidth, yPos);
    doc.setDrawColor(0, 0, 0);
    yPos += 10;

    // Experience Section
    if (jobTitle || company) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(selectedColor.primary[0], selectedColor.primary[1], selectedColor.primary[2]);
        doc.text(t('experience', 'EXPERIENCE'), leftMargin, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 7;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(jobTitle, leftMargin, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(`${company}`, leftMargin, yPos);
        yPos += 5;

        if (expStartDate || expEndDate) {
            doc.setFontSize(9);
            doc.setTextColor(100);
            doc.text(`${expStartDate} - ${expEndDate}`, leftMargin, yPos);
            doc.setTextColor(0);
            yPos += 6;
        }

        if (expDescription) {
            doc.setFontSize(10);
            const descLines = doc.splitTextToSize(expDescription, pageWidth - leftMargin - 10);
            doc.text(descLines, leftMargin, yPos);
            yPos += descLines.length * 5 + 5;
        }

        yPos += 5;
    }

    // Education Section
    if (degree || school) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(selectedColor.primary[0], selectedColor.primary[1], selectedColor.primary[2]);
        doc.text(t('education', 'EDUCATION'), leftMargin, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 7;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(degree, leftMargin, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(school, leftMargin, yPos);
        yPos += 5;

        if (eduStartDate || eduEndDate) {
            doc.setFontSize(9);
            doc.setTextColor(100);
            let dateText = `${eduStartDate} - ${eduEndDate}`;
            if (gpa) {
                dateText += ` | CGPA: ${gpa}/10`;
            }
            doc.text(dateText, leftMargin, yPos);
            doc.setTextColor(0);
            yPos += 8;
        }
    }

    // Skills Section
    if (skills) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(selectedColor.primary[0], selectedColor.primary[1], selectedColor.primary[2]);
        doc.text(t('skills', 'SKILLS'), leftMargin, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 7;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const skillLines = doc.splitTextToSize(skills, pageWidth - leftMargin - 10);
        doc.text(skillLines, leftMargin, yPos);
        yPos += skillLines.length * 5 + 5;
    }

    // Certifications Section
    if (certs.length > 0) {
        yPos += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(selectedColor.primary[0], selectedColor.primary[1], selectedColor.primary[2]);
        doc.text(t('certifications', 'CERTIFICATIONS'), leftMargin, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 7;

        certs.forEach((cert, index) => {
            // Check if we need a new page
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(cert.name, leftMargin, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(cert.platform, leftMargin, yPos);
            yPos += 5;

            if (cert.date) {
                doc.setFontSize(9);
                doc.setTextColor(100);
                let certInfo = cert.date;
                if (cert.url) {
                    certInfo += ` | ${cert.url}`;
                }
                doc.text(certInfo, leftMargin, yPos);
                doc.setTextColor(0);
                yPos += 6;
            }

            yPos += 2;
        });
    }

    // Save the PDF
    const fileName = fullName ? `${fullName.replace(/\s+/g, '_')}_Resume.pdf` : 'Resume.pdf';
    doc.save(fileName);
});