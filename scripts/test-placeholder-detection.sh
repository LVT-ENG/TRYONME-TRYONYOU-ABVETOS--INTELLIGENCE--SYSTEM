#!/bin/bash

# Manual Placeholder Detection Script
# Simulates the automatic detection for testing purposes

set -e

echo "🔍 Testing placeholder detection logic..."

# Function to check if text contains placeholders
check_placeholder_content() {
    local title="$1"
    local body="$2"
    
    # Define placeholder patterns to detect
    local title_placeholders=(
        "REPLACE_WITH_BRIEF_DESCRIPTION"
        "REPLACE_WITH_BUG_DESCRIPTION" 
        "REPLACE_WITH_DOCS_DESCRIPTION"
        "SCOPE"
        "descripción breve"
    )
    
    local body_placeholders=(
        "¿Qué problema resuelve?**: "
        "¿Por qué es necesario ahora?**: "
        "¿Qué valor aporta a los usuarios?**: "
        "Cambios clave**: "
        "Arquitectura/impacto**: "
        "Componentes afectados**: "
        "<!-- Paso específico -->"
        "<!-- Riesgo técnico o de negocio -->"
        "<!-- Cómo mitigar el riesgo -->"
        "<!-- Alternativa si la implementación falla -->"
        "<!-- número del issue relacionado -->"
        "⚠️ REEMPLAZA"
        "[DESCRIBE"
        "[EXPLICA"
        "[DETALLA"
        "[LISTA"
        "[ENUMERA"
        "[ESPECIFICA"
        "[PASO"
        "[IDENTIFICA"
        "[PROPORCIONA"
        "[NUMERO_DEL_ISSUE_RELACIONADO"
    )
    
    local has_placeholder_title=false
    local placeholder_count=0
    
    # Check title placeholders
    for placeholder in "${title_placeholders[@]}"; do
        if [[ "$title" == *"$placeholder"* ]]; then
            has_placeholder_title=true
            echo "  ❌ Title contains placeholder: $placeholder"
            break
        fi
    done
    
    # Check body placeholders
    for placeholder in "${body_placeholders[@]}"; do
        if [[ "$body" == *"$placeholder"* ]]; then
            ((placeholder_count++))
        fi
    done
    
    local has_placeholder_body=false
    if [[ $placeholder_count -ge 3 ]]; then
        has_placeholder_body=true
        echo "  ❌ Body contains $placeholder_count placeholder patterns"
    fi
    
    if [[ "$has_placeholder_title" == true || "$has_placeholder_body" == true ]]; then
        echo "  🚨 PLACEHOLDER CONTENT DETECTED - Would be flagged for auto-closure"
        return 1
    else
        echo "  ✅ No placeholder content detected"
        return 0
    fi
}

# Test cases
echo
echo "Testing placeholder detection with sample content..."

echo
echo "Test 1: Issue with placeholder title"
check_placeholder_content "feat(SCOPE): REPLACE_WITH_BRIEF_DESCRIPTION" "Real content here"

echo
echo "Test 2: Issue with placeholder body"
check_placeholder_content "feat(ui): real title" "## Motivación
- **¿Qué problema resuelve?**: 
- **¿Por qué es necesario ahora?**: 
- **¿Qué valor aporta a los usuarios?**: 
- **Cambios clave**: 
- **Arquitectura/impacto**: "

echo
echo "Test 3: Valid issue with content"
check_placeholder_content "feat(ui): add responsive navigation" "## Motivación
- **¿Qué problema resuelve?**: Los usuarios móviles no pueden navegar eficientemente
- **¿Por qué es necesario ahora?**: El 60% del tráfico viene de móviles
- **¿Qué valor aporta a los usuarios?**: Navegación intuitiva y accesible"

echo
echo "Test 4: Issue with placeholder instructions"
check_placeholder_content "feat(ui): new feature" "## Motivación
- **¿Qué problema resuelve?**: [DESCRIBE el problema específico que esta funcionalidad resuelve]
- **¿Por qué es necesario ahora?**: [EXPLICA la urgencia y timing]
- **¿Qué valor aporta a los usuarios?**: [DETALLA los beneficios concretos]"

echo
echo "🎯 Testing completed!"