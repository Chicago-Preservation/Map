// Unified Layer Control - Accordion Implementation
// This script creates a single, clean accordion interface that combines
// both the category layers (Student Projects) and GeoJSON layers (Municipal Governance)

class UnifiedLayerControl {
    constructor() {
        this.accordionContainer = null;
        this.sections = {};
        this.isInitialized = false;
        this.config = {
            sections: [
                {
                    id: 'municipal-governance',
                    title: 'Municipal Governance',
                    description: 'Official preservation data layers',
                    defaultExpanded: true
                },
                {
                    id: 'student-projects', 
                    title: 'Student Projects',
                    description: 'Academic research and projects',
                    defaultExpanded: false
                }
                // Add more sections here as needed
            ]
        };
    }

    // Step 1: Create the accordion structure
    createAccordionStructure() {
        // Create main container
        this.accordionContainer = document.createElement('div');
        this.accordionContainer.className = 'unified-layer-accordion';
        this.accordionContainer.id = 'unified-layer-accordion';

        // Create sections based on config
        this.config.sections.forEach(sectionConfig => {
            const section = this.createSection(sectionConfig);
            this.accordionContainer.appendChild(section);
            this.sections[sectionConfig.id] = section;
        });

        // Add to map
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.appendChild(this.accordionContainer);
        }
    }

    // Create individual section
    createSection(config) {
        const section = document.createElement('div');
        section.className = 'accordion-section';
        section.id = `section-${config.id}`;
        
        const header = document.createElement('button');
        header.className = `accordion-header ${config.id}-header`;
        header.innerHTML = `
            <span class="header-text">${config.title}</span>
            <span class="expand-icon">⌄</span>
        `;
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('data-section', config.id);
        
        const content = document.createElement('div');
        content.className = `accordion-content ${config.id}-content`;
        content.style.display = 'none';
        content.id = `content-${config.id}`;
        
        // Add description if provided
        if (config.description) {
            const description = document.createElement('div');
            description.className = 'section-description';
            description.textContent = config.description;
            content.appendChild(description);
        }
        
        section.appendChild(header);
        section.appendChild(content);

        // Add click handler
        header.addEventListener('click', () => this.toggleSection(config.id));
        
        return section;
    }

    // Step 2: Move existing layer controls into accordion
    moveExistingControls() {
        console.log('🔍 Looking for existing layer controls...');

        // Find and organize all layer controls
        const allControls = document.querySelectorAll('.leaflet-control-layers');
        console.log('📊 Found', allControls.length, 'total controls');

        // Municipal Governance controls (GeoJSON layers)
        const municipalControls = [];
        const studentControls = [];

        allControls.forEach((control, index) => {
            // Check if it's a municipal governance control
            if (control.classList.contains('municipal-governance-control') || 
                control.querySelector('a[href*="chicago.gov"]') ||
                control.querySelector('a[href*="nps.gov"]') ||
                control.querySelector('a[href*="preservationchicago.org"]')) {
                municipalControls.push(control);
            } else {
                // Assume it's a student project control
                studentControls.push(control);
            }
        });

        // Move municipal controls
        if (municipalControls.length > 0) {
            console.log('🏛️ Moving', municipalControls.length, 'municipal governance controls');
            const municipalContent = this.sections['municipal-governance'].querySelector('.accordion-content');
            municipalControls.forEach(control => {
                const clonedControl = control.cloneNode(true);
                municipalContent.appendChild(clonedControl);
                control.style.display = 'none';
            });
        }

        // Move student controls
        if (studentControls.length > 0) {
            console.log('🎓 Moving', studentControls.length, 'student project controls');
            const studentContent = this.sections['student-projects'].querySelector('.accordion-content');
            studentControls.forEach(control => {
                const clonedControl = control.cloneNode(true);
                studentContent.appendChild(clonedControl);
                control.style.display = 'none';
            });
        }

        // If no controls found, hide the entire accordion
        if (municipalControls.length === 0 && studentControls.length === 0) {
            console.log('⚠️ No controls found, hiding accordion');
            this.accordionContainer.style.display = 'none';
        } else {
            console.log('✅ Controls moved successfully');
        }
    }

    // Step 3: Add accordion functionality
    toggleSection(sectionId) {
        const section = this.sections[sectionId];
        if (!section) return;

        const header = section.querySelector('.accordion-header');
        const content = section.querySelector('.accordion-content');
        const expandIcon = header.querySelector('.expand-icon');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            // Collapse
            content.style.display = 'none';
            header.setAttribute('aria-expanded', 'false');
            expandIcon.textContent = '⌄';
            header.classList.remove('expanded');
        } else {
            // Expand
            content.style.display = 'block';
            header.setAttribute('aria-expanded', 'true');
            expandIcon.textContent = '⌃';
            header.classList.add('expanded');
        }
    }

    // Add new section dynamically
    addSection(config) {
        const section = this.createSection(config);
        this.accordionContainer.appendChild(section);
        this.sections[config.id] = section;
        
        // Re-initialize if already initialized
        if (this.isInitialized) {
            this.moveExistingControls();
        }
    }

    // Initialize the unified control
    init() {
        if (this.isInitialized) return;
        
        console.log('🔄 Initializing Unified Layer Control...');
        
        // Wait for the map and existing controls to be ready
        const initUnifiedControl = () => {
            // Check if the map and controls are ready
            const mapContainer = document.getElementById('map');
            const existingControls = document.querySelectorAll('.leaflet-control-layers');
            
            console.log('📍 Map container:', mapContainer ? 'Found' : 'Not found');
            console.log('🎛️ Existing controls:', existingControls.length);
            
            if (mapContainer && existingControls.length > 0) {
                console.log('✅ Creating unified accordion structure...');
                this.createAccordionStructure();
                this.moveExistingControls();
                this.isInitialized = true;
                
                // Expand default sections
                this.config.sections.forEach(section => {
                    if (section.defaultExpanded) {
                        this.toggleSection(section.id);
                    }
                });
                
                console.log('✅ Unified Layer Control initialized successfully!');
            } else {
                console.log('⏳ Waiting for map and controls to be ready...');
                // Try again in 500ms
                setTimeout(initUnifiedControl, 500);
            }
        };
        
        // Start the initialization process
        setTimeout(initUnifiedControl, 1000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.unifiedLayerControl = new UnifiedLayerControl();
    window.unifiedLayerControl.init();
});

// Also initialize when map is ready (fallback)
if (typeof map !== 'undefined') {
    window.unifiedLayerControl = new UnifiedLayerControl();
    window.unifiedLayerControl.init();
}

// Additional fallback for when the map loads after DOM
window.addEventListener('load', function() {
    // Check if we already have a unified control
    if (!document.getElementById('unified-layer-accordion')) {
        window.unifiedLayerControl = new UnifiedLayerControl();
        window.unifiedLayerControl.init();
    }
});

// Listen for map initialization events
document.addEventListener('mapReady', function() {
    window.unifiedLayerControl = new UnifiedLayerControl();
    window.unifiedLayerControl.init();
}); 