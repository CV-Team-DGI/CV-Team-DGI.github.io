// Store certifications
let certifications = [];
let experiences = [];
let educations = [];

// Simple tab panel visibility management - no active state manipulation
const tabs = document.querySelector('md-tabs');
const panels = document.querySelectorAll('.tab-panel');

if (tabs && panels.length > 0) {
    tabs.addEventListener('change', () => {
        // Hide all panels
        panels.forEach(panel => {
            panel.hidden = true;
        });
        
        // Show the panel the user clicked
        const activeTab = tabs.activeTab;
        if (activeTab) {
            const panelId = activeTab.getAttribute('aria-controls');
            const activePanel = document.getElementById(panelId);
            if (activePanel) {
                activePanel.hidden = false;
            }
        }
    });

    // Show first panel on load
    panels.forEach(panel => panel.hidden = true);
    const firstPanel = document.getElementById('personal-info-panel');
    if (firstPanel) {
        firstPanel.hidden = false;
    }
}

// Add experience button handler
document.getElementById('add-experience-btn').addEventListener('click', function() {
  const container = document.getElementById('experience-container');
  const newEntry = document.createElement('div');
  newEntry.className = 'experience-entry';
  newEntry.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <h3 style="font-size: 0.875rem; font-weight: 500;">Experience ${container.children.length + 1}</h3>
      <md-icon-button class="remove-exp-btn">
        <md-icon>delete</md-icon>
      </md-icon-button>
    </div>
    <md-filled-text-field label="Job Title" class="exp-title nav-field" style="width: 100%"></md-filled-text-field>
    <md-filled-text-field label="Company" class="exp-company nav-field" style="width: 100%"></md-filled-text-field>
    <div class="form-row">
      <md-filled-text-field label="Start Date" class="exp-start nav-field" type="date"></md-filled-text-field>
      <md-filled-text-field label="End Date" class="exp-end nav-field" type="date"></md-filled-text-field>
    </div>
    <md-filled-text-field label="Description" class="exp-desc nav-field" type="textarea" rows="5" style="width: 100%"></md-filled-text-field>
  `;
  
  container.appendChild(newEntry);
  setupFieldNavigation();
  
  // Add remove handler
  newEntry.querySelector('.remove-exp-btn').addEventListener('click', function() {
    newEntry.remove();
  });
});

// Add education button handler
document.getElementById('add-education-btn').addEventListener('click', function() {
  const container = document.getElementById('education-container');
  const newEntry = document.createElement('div');
  newEntry.className = 'education-entry';
  newEntry.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <h3 style="font-size: 0.875rem; font-weight: 500;">Education ${container.children.length + 1}</h3>
      <md-icon-button class="remove-edu-btn">
        <md-icon>delete</md-icon>
      </md-icon-button>
    </div>
    <md-filled-text-field label="Degree" class="edu-degree nav-field" style="width: 100%"></md-filled-text-field>
    <md-filled-text-field label="School" class="edu-school nav-field" style="width: 100%"></md-filled-text-field>
    <div class="form-row">
      <md-filled-text-field label="Start Date" class="edu-start nav-field" type="date"></md-filled-text-field>
      <md-filled-text-field label="End Date" class="edu-end nav-field" type="date"></md-filled-text-field>
    </div>
    <md-filled-text-field label="CGPA (optional)" class="edu-gpa nav-field" type="number" step="0.01" min="0" max="10" style="width: 100%" supporting-text="On 10 scale"></md-filled-text-field>
  `;
  
  container.appendChild(newEntry);
  setupFieldNavigation();
  
  // Add remove handler
  newEntry.querySelector('.remove-edu-btn').addEventListener('click', function() {
    newEntry.remove();
  });
});

// Add certification button handler (updated with navigation setup)
const addCertBtn = document.getElementById('add-certification-btn');
const originalCertHandler = addCertBtn.onclick;
addCertBtn.onclick = null;

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
  setupFieldNavigation();
  
  // Add remove handler
  newEntry.querySelector('.remove-cert-btn').addEventListener('click', function() {
    newEntry.remove();
  });
});

// Function to collect experiences
function collectExperiences() {
  experiences = [];
  document.querySelectorAll('.experience-entry').forEach(entry => {
    const title = entry.querySelector('.exp-title').value;
    const company = entry.querySelector('.exp-company').value;
    const startDate = entry.querySelector('.exp-start').value;
    const endDate = entry.querySelector('.exp-end').value;
    const description = entry.querySelector('.exp-desc').value;
    
    if (title || company) {
      experiences.push({ title, company, startDate, endDate, description });
    }
  });
  return experiences;
}

// Function to collect educations
function collectEducations() {
  educations = [];
  document.querySelectorAll('.education-entry').forEach(entry => {
    const degree = entry.querySelector('.edu-degree').value;
    const school = entry.querySelector('.edu-school').value;
    const startDate = entry.querySelector('.edu-start').value;
    const endDate = entry.querySelector('.edu-end').value;
    const gpa = entry.querySelector('.edu-gpa').value;
    
    if (degree || school) {
      educations.push({ degree, school, startDate, endDate, gpa });
    }
  });
  return educations;
}

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

// Setup field navigation (Enter key and Next buttons)
function setupFieldNavigation() {
  // Handle Enter key on all nav-fields
  document.querySelectorAll('.nav-field').forEach(field => {
    // Remove existing keydown listeners by using a named function
    if (!field.hasNavigationListener) {
      field.hasNavigationListener = true;
      field.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          
          // Check if this is a last field in tab
          if (this.dataset.lastField === 'true' && this.dataset.nextTab) {
            navigateToTab(this.dataset.nextTab);
          } else {
            // Move to next field
            const allFields = Array.from(document.querySelectorAll('.nav-field'));
            const currentIndex = allFields.indexOf(this);
            if (currentIndex < allFields.length - 1) {
              const nextField = allFields[currentIndex + 1];
              // Check if next field is visible
              if (nextField.offsetParent !== null) {
                nextField.focus();
              }
            }
          }
        }
      });
    }
  });
}

// Navigate to specific tab - just show the panel user wants
function navigateToTab(tabName) {
  // Check if we're on the home page
  const homePage = document.getElementById('home-page');
  if (!homePage || !homePage.classList.contains('active')) {
    // If not on home page, go to home first
    window.location.hash = 'home';
    setTimeout(() => {
      navigateToTab(tabName);
    }, 200);
    return;
  }
  
  // Hide all panels
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(panel => panel.hidden = true);
  
  // Show the requested panel
  const panel = document.getElementById(`${tabName}-panel`);
  if (panel) {
    panel.hidden = false;
    
    // Update the md-tabs active tab
    const tabs = document.querySelector('md-tabs');
    if (tabs) {
      // Find the index of the tab we want to navigate to
      const tabIds = ['personal-info', 'experience', 'education', 'skills', 'certifications'];
      const tabIndex = tabIds.indexOf(tabName);
      if (tabIndex !== -1) {
        tabs.activeTabIndex = tabIndex;
      }
    }
    
    // Focus first field
    setTimeout(() => {
      const firstField = panel.querySelector('.nav-field');
      if (firstField) {
        firstField.focus();
      }
    }, 100);
  }
}

// Setup Next buttons
function setupNextButtons() {
  document.querySelectorAll('.next-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const nextTab = this.dataset.nextTab;
      navigateToTab(nextTab);
    });
  });
}

// Initialize navigation
setupNextButtons();
setupFieldNavigation();

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

    const skills = document.getElementById('skills').value || '';
    
    // Get multiple entries
    const exps = collectExperiences();
    const edus = collectEducations();
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
    if (exps.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(selectedColor.primary[0], selectedColor.primary[1], selectedColor.primary[2]);
        doc.text(t('experience', 'EXPERIENCE'), leftMargin, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 7;

        exps.forEach((exp, index) => {
            // Check if we need a new page
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(exp.title, leftMargin, yPos);
            yPos += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.text(`${exp.company}`, leftMargin, yPos);
            yPos += 5;

            if (exp.startDate || exp.endDate) {
                doc.setFontSize(9);
                doc.setTextColor(100);
                doc.text(`${exp.startDate} - ${exp.endDate || 'Present'}`, leftMargin, yPos);
                doc.setTextColor(0);
                yPos += 6;
            }

            if (exp.description) {
                doc.setFontSize(10);
                const descLines = doc.splitTextToSize(exp.description, pageWidth - leftMargin - 10);
                doc.text(descLines, leftMargin, yPos);
                yPos += descLines.length * 5 + 5;
            }

            yPos += 3;
        });

        yPos += 2;
    }

    // Education Section
    if (edus.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(selectedColor.primary[0], selectedColor.primary[1], selectedColor.primary[2]);
        doc.text(t('education', 'EDUCATION'), leftMargin, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 7;

        edus.forEach((edu, index) => {
            // Check if we need a new page
            if (yPos > 260) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(edu.degree, leftMargin, yPos);
            yPos += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.text(edu.school, leftMargin, yPos);
            yPos += 5;

            if (edu.startDate || edu.endDate) {
                doc.setFontSize(9);
                doc.setTextColor(100);
                let dateText = `${edu.startDate} - ${edu.endDate}`;
                if (edu.gpa) {
                    dateText += ` | CGPA: ${edu.gpa}/10`;
                }
                doc.text(dateText, leftMargin, yPos);
                doc.setTextColor(0);
                yPos += 8;
            }

            yPos += 2;
        });
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