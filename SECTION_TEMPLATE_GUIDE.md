# Section Template Guide for Unified Layer Control

## Overview

This guide shows you how to easily add new sections to the unified layer control accordion using the template system. The template system provides a simple way to organize different types of preservation data into logical categories.

## Quick Start

### Adding a New Section

To add a new section to the accordion, use the template system:

```javascript
// Add a section using a predefined template
SectionTemplate.addSectionFromTemplate("academic");

// Or add a custom section
const customSection = {
    id: 'my-custom-section',
    title: 'My Custom Section',
    description: 'Description of what this section contains',
    defaultExpanded: false
};

window.unifiedLayerControl.addSection(customSection);
```

## Available Templates

### 1. Academic Research
```javascript
SectionTemplate.addSectionFromTemplate("academic");
```
- **ID**: `academic-research`
- **Title**: "Academic Research"
- **Description**: "University research and academic studies"
- **Use Case**: Research papers, thesis projects, academic studies

### 2. Community Projects
```javascript
SectionTemplate.addSectionFromTemplate("community");
```
- **ID**: `community-projects`
- **Title**: "Community Projects"
- **Description**: "Local community preservation initiatives"
- **Use Case**: Community-driven preservation efforts, local initiatives

### 3. Historical Sites
```javascript
SectionTemplate.addSectionFromTemplate("historical");
```
- **ID**: `historical-sites`
- **Title**: "Historical Sites"
- **Description**: "Sites of historical significance"
- **Use Case**: Important historical locations, heritage sites

### 4. Government Data
```javascript
SectionTemplate.addSectionFromTemplate("government");
```
- **ID**: `government-data`
- **Title**: "Government Data"
- **Description**: "Official government preservation data"
- **Use Case**: Official government datasets, regulatory information

### 5. Preservation Advocacy
```javascript
SectionTemplate.addSectionFromTemplate("advocacy");
```
- **ID**: `preservation-advocacy`
- **Title**: "Preservation Advocacy"
- **Description**: "Advocacy groups and preservation organizations"
- **Use Case**: Advocacy groups, preservation organizations

### 6. Preservation Events
```javascript
SectionTemplate.addSectionFromTemplate("events");
```
- **ID**: `preservation-events`
- **Title**: "Preservation Events"
- **Description**: "Upcoming and past preservation events"
- **Use Case**: Events, workshops, conferences

### 7. Preservation Resources
```javascript
SectionTemplate.addSectionFromTemplate("resources");
```
- **ID**: `preservation-resources`
- **Title**: "Preservation Resources"
- **Description**: "Tools, guides, and resources for preservation"
- **Use Case**: Tools, guides, educational resources

## Creating Custom Sections

### Basic Custom Section
```javascript
const mySection = {
    id: 'my-section',
    title: 'My Section',
    description: 'Description of my section',
    defaultExpanded: false
};

window.unifiedLayerControl.addSection(mySection);
```

### Advanced Custom Section
```javascript
const advancedSection = {
    id: 'advanced-section',
    title: 'Advanced Section',
    description: 'Advanced section with custom properties',
    defaultExpanded: true,
    // Custom properties for specific functionality
    customProperty: 'value',
    layerType: 'custom',
    dataSource: 'external'
};

window.unifiedLayerControl.addSection(advancedSection);
```

## Section Configuration Options

### Required Properties
- **`id`**: Unique identifier for the section (used in CSS classes and JavaScript)
- **`title`**: Display name for the section header
- **`description`**: Brief description shown below the header

### Optional Properties
- **`defaultExpanded`**: Whether the section should be expanded by default (default: `false`)
- **Custom properties**: Any additional properties you need for your specific use case

## Adding Multiple Sections

### Using Templates
```javascript
// Add multiple sections using templates
const templates = ["academic", "community", "historical"];
templates.forEach(template => {
    SectionTemplate.addSectionFromTemplate(template);
});
```

### Custom Multiple Sections
```javascript
const multipleSections = [
    {
        id: 'section-1',
        title: 'Section One',
        description: 'First section',
        defaultExpanded: false
    },
    {
        id: 'section-2',
        title: 'Section Two',
        description: 'Second section',
        defaultExpanded: true
    }
];

multipleSections.forEach(section => {
    window.unifiedLayerControl.addSection(section);
});
```

## Modifying Existing Sections

### Change Section Properties
```javascript
// Modify existing section properties
window.unifiedLayerControl.config.sections.forEach(section => {
    if (section.id === 'municipal-governance') {
        section.title = 'Government Data';
        section.description = 'Official government preservation data';
    }
});
```

### Remove Sections
```javascript
// Hide a section (you can't remove it completely, but you can hide it)
const section = document.getElementById('section-municipal-governance');
if (section) {
    section.style.display = 'none';
}
```

## Integration with Layer Controls

### Automatic Layer Detection
The unified control automatically detects and organizes layer controls based on:
- Class names (e.g., `municipal-governance-control`)
- Link content (e.g., URLs containing "chicago.gov", "nps.gov")
- Control position and structure

### Manual Layer Assignment
If you need to manually assign layers to specific sections:

```javascript
// Find specific layer controls and move them to a section
const customLayers = document.querySelectorAll('.my-custom-layers');
const sectionContent = document.getElementById('content-my-custom-section');

customLayers.forEach(layer => {
    const clonedLayer = layer.cloneNode(true);
    sectionContent.appendChild(clonedLayer);
    layer.style.display = 'none';
});
```

## Best Practices

### 1. Naming Conventions
- Use kebab-case for IDs (e.g., `my-custom-section`)
- Use descriptive titles that users will understand
- Keep descriptions concise but informative

### 2. Organization
- Group related layers together in logical sections
- Use consistent naming across similar sections
- Consider the user's workflow when organizing sections

### 3. Performance
- Don't create too many sections (recommend 3-6 total)
- Use `defaultExpanded: false` for most sections
- Consider mobile users when designing sections

### 4. Accessibility
- Use descriptive titles and descriptions
- Ensure proper ARIA attributes (handled automatically)
- Test keyboard navigation

## Troubleshooting

### Common Issues

1. **Section not appearing**
   - Check that the unified control is initialized
   - Verify the section configuration is correct
   - Check browser console for errors

2. **Layers not appearing in section**
   - Ensure layer controls have proper class names
   - Check that layer detection logic matches your controls
   - Verify the section content container exists

3. **Styling issues**
   - Check CSS class names match section IDs
   - Verify responsive design works on mobile
   - Test different screen sizes

### Debug Commands
```javascript
// Check if unified control is available
console.log('Unified Control:', window.unifiedLayerControl);

// List all sections
console.log('Sections:', window.unifiedLayerControl.config.sections);

// Check for layer controls
console.log('Layer Controls:', document.querySelectorAll('.leaflet-control-layers'));
```

## Examples

### Complete Example: Adding Academic Research Section
```javascript
// Wait for the unified control to be ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.unifiedLayerControl) {
            SectionTemplate.addSectionFromTemplate("academic");
            console.log('✅ Academic research section added');
        }
    }, 2000);
});
```

### Example: Custom Section with Specific Layers
```javascript
// Create a custom section for research data
const researchSection = {
    id: 'research-data',
    title: 'Research Data',
    description: 'Academic research and data analysis',
    defaultExpanded: false
};

window.unifiedLayerControl.addSection(researchSection);

// Move specific research layers to this section
const researchLayers = document.querySelectorAll('.research-layer-control');
const researchContent = document.getElementById('content-research-data');

researchLayers.forEach(layer => {
    const clonedLayer = layer.cloneNode(true);
    researchContent.appendChild(clonedLayer);
    layer.style.display = 'none';
});
```

## Future Enhancements

### Planned Features
1. **Dynamic Section Loading**: Load sections based on available data
2. **User Preferences**: Save section state in localStorage
3. **Custom Styling**: Allow custom CSS per section
4. **Advanced Filtering**: Filter layers within sections
5. **Section Templates**: More predefined templates for common use cases

### Extension Points
- Add section-specific functionality
- Integrate with external data sources
- Create section-specific styling
- Add section-level analytics

This template system provides a flexible foundation for organizing your preservation data in a user-friendly way while maintaining the clean, unified interface. 