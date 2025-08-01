// Enhanced Leaflet Layer Control
// This script enhances the original Leaflet layer control to have an accordion-style appearance
// instead of creating a separate unified control

class EnhancedLayerControl {
    constructor() {
        this.config = {
            sections: [
                {
                    id: 'municipal-governance',
                    title: 'Municipal Governance',
                    icon: 'fa fa-building'
                },
                {
                    id: 'student-projects', 
                    title: 'Student Projects',
                    icon: 'fa fa-graduation-cap'
                }
            ]
        };
        
        // Initialize immediately to prevent flickering
        this.init();
    }

    init() {
        console.log('🔧 Enhanced Layer Control: Initializing...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.enhanceOriginalControl();
            });
        } else {
            // DOM is already ready
            this.enhanceOriginalControl();
        }
    }

    enhanceOriginalControl() {
        console.log('🔧 Enhanced Layer Control: Enhancing original control...');
        
        // Find the original Leaflet layer control
        const originalControl = document.querySelector('.leaflet-control-layers');
        
        if (!originalControl) {
            console.log('❌ Enhanced Layer Control: Original control not found, retrying...');
            // Retry after a short delay
            setTimeout(() => this.enhanceOriginalControl(), 500);
            return;
        }
        
        console.log('✅ Enhanced Layer Control: Found original control');
        
        // Hide the original control immediately to prevent flickering
        originalControl.style.display = 'none';
        originalControl.style.visibility = 'hidden';
        originalControl.style.opacity = '0';
        
        // Add enhanced styling class
        originalControl.classList.add('enhanced-layer-control');
        
        // Create accordion structure within the original control
        this.createAccordionStructure(originalControl);
        
        // Move existing layer lists into accordion sections
        this.moveLayerLists(originalControl);
        
        // Show the enhanced control
        originalControl.style.display = 'block';
        originalControl.style.visibility = 'visible';
        originalControl.style.opacity = '1';
        
        console.log('✅ Enhanced Layer Control: Enhancement complete');
    }

    createAccordionStructure(container) {
        console.log('🔧 Enhanced Layer Control: Creating accordion structure...');
        
        // Clear existing content but keep the layer lists
        const layerLists = container.querySelectorAll('.leaflet-control-layers-overlays');
        
        // Create accordion container
        const accordionContainer = document.createElement('div');
        accordionContainer.className = 'enhanced-accordion';
        
        // Create sections
        this.config.sections.forEach((section, index) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'enhanced-section';
            sectionElement.id = section.id;
            
            const header = document.createElement('div');
            header.className = 'enhanced-header';
            header.innerHTML = `
                <i class="${section.icon}"></i>
                <span>${section.title}</span>
                <i class="fa fa-chevron-down enhanced-arrow"></i>
            `;
            
            const content = document.createElement('div');
            content.className = 'enhanced-content';
            
            // Add click handler for accordion functionality
            header.addEventListener('click', () => this.toggleSection(sectionElement));
            
            sectionElement.appendChild(header);
            sectionElement.appendChild(content);
            accordionContainer.appendChild(sectionElement);
        });
        
        // Clear container and add accordion
        container.innerHTML = '';
        container.appendChild(accordionContainer);
        
        // Store layer lists for later use
        this.layerLists = layerLists;
        
        console.log('✅ Enhanced Layer Control: Accordion structure created');
    }

    moveLayerLists(container) {
        console.log('🔧 Enhanced Layer Control: Moving layer lists...');
        
        if (!this.layerLists || this.layerLists.length === 0) {
            console.log('❌ Enhanced Layer Control: No layer lists found');
            return;
        }
        
        // Find accordion sections
        const municipalSection = container.querySelector('#municipal-governance .enhanced-content');
        const studentSection = container.querySelector('#student-projects .enhanced-content');
        
        if (!municipalSection || !studentSection) {
            console.log('❌ Enhanced Layer Control: Accordion sections not found');
            return;
        }
        
        // Move layer lists to appropriate sections
        this.layerLists.forEach((layerList, index) => {
            if (index === 0 && municipalSection) {
                // First layer list goes to Municipal Governance
                municipalSection.appendChild(layerList.cloneNode(true));
                console.log('✅ Enhanced Layer Control: Moved municipal layers');
            } else if (index === 1 && studentSection) {
                // Second layer list goes to Student Projects
                studentSection.appendChild(layerList.cloneNode(true));
                console.log('✅ Enhanced Layer Control: Moved student layers');
            }
        });
        
        // Open Municipal Governance by default
        const municipalHeader = container.querySelector('#municipal-governance .enhanced-header');
        if (municipalHeader) {
            municipalHeader.click();
        }
        
        console.log('✅ Enhanced Layer Control: Layer lists moved successfully');
    }

    toggleSection(sectionElement) {
        const content = sectionElement.querySelector('.enhanced-content');
        const arrow = sectionElement.querySelector('.enhanced-arrow');
        const isOpen = content.style.display === 'block';
        
        // Close all sections first
        document.querySelectorAll('.enhanced-content').forEach(content => {
            content.style.display = 'none';
        });
        
        document.querySelectorAll('.enhanced-arrow').forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });
        
        // Open clicked section if it was closed
        if (!isOpen) {
            content.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
        }
        
        console.log('🔄 Enhanced Layer Control: Toggled section:', sectionElement.id);
    }
}

// Initialize enhanced layer control
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced Layer Control: Starting initialization...');
    window.enhancedLayerControl = new EnhancedLayerControl();
});

// Global debug function
window.debugEnhancedControl = function() {
    console.log('🔍 Enhanced Layer Control Debug:');
    console.log('- Original control:', document.querySelector('.leaflet-control-layers'));
    console.log('- Enhanced control:', document.querySelector('.enhanced-layer-control'));
    console.log('- Accordion sections:', document.querySelectorAll('.enhanced-section'));
    console.log('- Layer lists:', document.querySelectorAll('.leaflet-control-layers-overlays'));
}; 