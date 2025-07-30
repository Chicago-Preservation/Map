// Section Template for Unified Layer Control
// This file shows how to add new sections to the accordion

// Example: How to add a new section to the unified layer control
function addNewSection() {
    // Get the unified control instance
    const unifiedControl = window.unifiedLayerControl;
    
    if (unifiedControl) {
        // Define your new section configuration
        const newSectionConfig = {
            id: 'community-initiatives',
            title: 'Community Initiatives',
            description: 'Local preservation and community projects',
            defaultExpanded: false
        };
        
        // Add the section
        unifiedControl.addSection(newSectionConfig);
        
        console.log('✅ Added new section:', newSectionConfig.title);
    }
}

// Example: How to add multiple sections at once
function addMultipleSections() {
    const unifiedControl = window.unifiedLayerControl;
    
    if (unifiedControl) {
        const newSections = [
            {
                id: 'research-projects',
                title: 'Research Projects',
                description: 'Academic research and studies',
                defaultExpanded: false
            },
            {
                id: 'historical-events',
                title: 'Historical Events',
                description: 'Significant historical events and milestones',
                defaultExpanded: false
            },
            {
                id: 'preservation-advocacy',
                title: 'Preservation Advocacy',
                description: 'Advocacy groups and initiatives',
                defaultExpanded: false
            }
        ];
        
        newSections.forEach(section => {
            unifiedControl.addSection(section);
        });
        
        console.log('✅ Added', newSections.length, 'new sections');
    }
}

// Example: How to modify existing sections
function modifyExistingSections() {
    const unifiedControl = window.unifiedLayerControl;
    
    if (unifiedControl) {
        // You can modify the config to change section properties
        unifiedControl.config.sections.forEach(section => {
            if (section.id === 'municipal-governance') {
                section.title = 'Government Data';
                section.description = 'Official preservation data from government sources';
            }
        });
    }
}

// Example: How to create a custom section with specific layer controls
function createCustomSection() {
    const unifiedControl = window.unifiedLayerControl;
    
    if (unifiedControl) {
        const customSection = {
            id: 'custom-data',
            title: 'Custom Data Layers',
            description: 'User-defined and custom preservation data',
            defaultExpanded: false,
            // You can add custom properties for specific functionality
            customProperty: 'value'
        };
        
        unifiedControl.addSection(customSection);
    }
}

// Template for different types of sections you might want to add:

const sectionTemplates = {
    // Academic/Research sections
    academic: {
        id: 'academic-research',
        title: 'Academic Research',
        description: 'University research and academic studies',
        defaultExpanded: false
    },
    
    // Community sections
    community: {
        id: 'community-projects',
        title: 'Community Projects',
        description: 'Local community preservation initiatives',
        defaultExpanded: false
    },
    
    // Historical sections
    historical: {
        id: 'historical-sites',
        title: 'Historical Sites',
        description: 'Sites of historical significance',
        defaultExpanded: false
    },
    
    // Government sections
    government: {
        id: 'government-data',
        title: 'Government Data',
        description: 'Official government preservation data',
        defaultExpanded: true
    },
    
    // Advocacy sections
    advocacy: {
        id: 'preservation-advocacy',
        title: 'Preservation Advocacy',
        description: 'Advocacy groups and preservation organizations',
        defaultExpanded: false
    },
    
    // Events sections
    events: {
        id: 'preservation-events',
        title: 'Preservation Events',
        description: 'Upcoming and past preservation events',
        defaultExpanded: false
    },
    
    // Resources sections
    resources: {
        id: 'preservation-resources',
        title: 'Preservation Resources',
        description: 'Tools, guides, and resources for preservation',
        defaultExpanded: false
    }
};

// Function to add a section using a template
function addSectionFromTemplate(templateName) {
    const unifiedControl = window.unifiedLayerControl;
    const template = sectionTemplates[templateName];
    
    if (unifiedControl && template) {
        unifiedControl.addSection(template);
        console.log('✅ Added section from template:', template.title);
    } else {
        console.error('❌ Template not found or unified control not available');
    }
}

// Export functions for use in other scripts
window.SectionTemplate = {
    addNewSection,
    addMultipleSections,
    modifyExistingSections,
    createCustomSection,
    addSectionFromTemplate,
    templates: sectionTemplates
};

console.log('📋 Section Template loaded. Use SectionTemplate.addSectionFromTemplate("templateName") to add sections.'); 