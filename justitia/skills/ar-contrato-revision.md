# Justitia · Revisión de Contrato — Derecho Argentino
**skill id**: `justitia/ar-contrato-revision`  
**version**: 1.0.0  
**author**: Justitia  
**scope**: Contratos comerciales bajo legislación argentina  
**output**: JSON  

---

## Descripción

Analizá el contrato activo contra las 20 hipótesis del marco Justitia AR —
equivalente argentino del benchmark ContractNLI de Stanford, adaptado al
Código Civil y Comercial de la Nación (CCyC, Ley 26.994) y legislación
complementaria.

Para cada hipótesis determiná:

| Código | Significado |
|--------|-------------|
| `E`    | **Contemplado** — el contrato incluye esta disposición de forma efectiva |
| `X`    | **Contradicho** — el contrato excluye o contradice esta disposición |
| `N`    | **No mencionado** — el contrato guarda silencio sobre el punto |

Para todo resultado `E` o `X`, citá la cláusula o artículo exacto del contrato
que sostiene la clasificación.

---

## Las 20 Hipótesis · Marco Justitia AR

### Bloque 1 · Confidencialidad e Identificación
**AR-01** · *Identificación expresa*  
«La información confidencial se identifica de forma expresa y taxativa en el contrato.»  
Base: Art. 992 CCyC (deber de confidencialidad precontractual); práctica contractual argentina.

**AR-02** · *Información verbal incluida*  
«La información confidencial incluye información transmitida en forma verbal u oral.»

**AR-03** · *Naturaleza recíproca*  
«Las obligaciones de confidencialidad son recíprocas entre las partes.»

---

### Bloque 2 · Uso y Licencias
**AR-04** · *Uso limitado al objeto*  
«El uso de la información confidencial está limitado exclusivamente al propósito u objeto definido en el contrato.»  
Base: Art. 1061-1065 CCyC (interpretación del contrato).

**AR-05** · *Sin licencia de PI*  
«El contrato no otorga licencias sobre derechos de propiedad intelectual de ninguna de las partes.»  
Base: Ley 11.723 (propiedad intelectual).

---

### Bloque 3 · Obligaciones del Receptor
**AR-06** · *Estándar de diligencia*  
«El receptor protege la información confidencial con el mismo grado de diligencia que aplica a su propia información confidencial de igual naturaleza.»  
Base: Art. 1724 CCyC (culpa y dolo).

**AR-07** · *Compartir con empleados*  
«El receptor puede compartir información confidencial con sus propios empleados o colaboradores, bajo obligación de confidencialidad equivalente.»

**AR-08** · *Compartir con terceros autorizados*  
«El receptor puede compartir información confidencial con asesores externos, consultores o terceros autorizados, bajo reserva.»  
Base: Art. 1021-1022 CCyC (efectos respecto de terceros).

---

### Bloque 4 · Prohibiciones
**AR-09** · *Prohibición de ingeniería inversa*  
«El contrato prohíbe la ingeniería inversa de productos o sistemas que contengan información confidencial.»  
Base: Ley 11.723; Ley 25.326 (datos).

**AR-10** · *No competencia*  
«El contrato establece obligaciones de no competencia o exclusividad para el receptor.»  
Base: Art. 1646 CCyC (contratos de obra y servicios); Art. 988 CCyC (cláusulas abusivas — evaluar validez).

---

### Bloque 5 · Divulgación Forzada
**AR-11** · *Aviso en divulgación forzada*  
«El receptor debe notificar al divulgante si es requerido por autoridad pública, judicial o regulatoria a revelar información confidencial, antes de hacerlo y con la antelación que sea posible.»  
Base: Art. 992 CCyC; regulación de organismos (BCRA, CNV, AFIP, ANMAT).

---

### Bloque 6 · Término y Supervivencia
**AR-12** · *Plazo de vigencia determinado*  
«El contrato establece un plazo determinado para la vigencia de las obligaciones de confidencialidad.»  
Base: Art. 1545 CCyC (plazo en contratos).

**AR-13** · *Supervivencia post-extinción*  
«Las obligaciones de confidencialidad sobreviven a la rescisión, resolución o extinción del contrato.»  
Base: Art. 1078 CCyC (efectos de la extinción).

**AR-14** · *Devolución o destrucción*  
«El receptor debe devolver o destruir la información confidencial (y sus copias) al vencimiento o extinción del contrato.»

---

### Bloque 7 · Excepciones
**AR-15** · *Excepciones estándar*  
«El contrato prevé excepciones a la confidencialidad para información de dominio público, conocimiento previo independiente o desarrollo autónomo.»  
Base: Art. 1041-1042 CCyC (objeto del contrato — posibilidad y licitud).

**AR-16** · *Cláusula de residuales*  
«El contrato incluye una cláusula de "residuales": información retenida en la memoria de las personas sin esfuerzo deliberado queda excluida de las obligaciones.»  
Nota: Las residual clauses son habituales en modelos angloamericanos; en Argentina su validez no está testada judicialmente — marcar si aparece.

---

### Bloque 8 · Jurisdicción y Disputas
**AR-17** · *Jurisdicción argentina*  
«El contrato establece jurisdicción argentina y ley aplicable argentina como derecho rector.»  
Base: Art. 2650-2651 CCyC (derecho internacional privado — autonomía de la voluntad).

**AR-18** · *Resolución alternativa de disputas*  
«El contrato prevé un mecanismo de resolución alternativa de disputas (arbitraje, mediación o conciliación).»  
Base: Ley 26.589 (mediación obligatoria); Ley 27.449 (arbitraje comercial internacional).

---

### Bloque 9 · Propiedad Intelectual y Datos
**AR-19** · *Titularidad de desarrollos*  
«El contrato establece la titularidad de toda propiedad intelectual desarrollada durante la vigencia de la relación contractual.»  
Base: Ley 11.723 (PI); Ley 25.164 (empleo público, si aplica).

**AR-20** · *Tratamiento de datos personales*  
«El contrato regula el tratamiento de datos personales conforme a la legislación argentina vigente.»  
Base: Ley 25.326 (PDPA argentina); disposiciones AAIP (ex DNPDP).

---

## Formato de salida obligatorio

Devolvé **únicamente** el siguiente JSON, sin texto adicional ni markdown:

```json
{
  "ar-01": "E|X|N",
  "ar-02": "E|X|N",
  "ar-03": "E|X|N",
  "ar-04": "E|X|N",
  "ar-05": "E|X|N",
  "ar-06": "E|X|N",
  "ar-07": "E|X|N",
  "ar-08": "E|X|N",
  "ar-09": "E|X|N",
  "ar-10": "E|X|N",
  "ar-11": "E|X|N",
  "ar-12": "E|X|N",
  "ar-13": "E|X|N",
  "ar-14": "E|X|N",
  "ar-15": "E|X|N",
  "ar-16": "E|X|N",
  "ar-17": "E|X|N",
  "ar-18": "E|X|N",
  "ar-19": "E|X|N",
  "ar-20": "E|X|N",
  "_evidencia": {
    "ar-01": "Cláusula X.X: «...texto relevante...»",
    "ar-10": "Cláusula X.X: «...» — NOTA: evaluar validez Art. 988 CCyC"
  },
  "_alertas": [
    "Cláusula X.X podría ser abusiva bajo Art. 988 CCyC",
    "No se establece plazo de vigencia — riesgo de indeterminación"
  ]
}
```

---

## Notas para el análisis

1. **Código rector**: Código Civil y Comercial de la Nación (Ley 26.994, vigente desde agosto 2015).
2. **Interpretación**: Si el contrato usa terminología distinta al CCyC, clasificar por función económica equivalente, no por denominación.
3. **Ambigüedad**: Cláusulas ambiguas se clasifican `N` con nota en `_evidencia`.
4. **Alertas**: Usá `_alertas` para señalar cláusulas potencialmente nulas, abusivas o contrarias al orden público argentino.
5. **Datos regulatorios**: Para contratos con entidades supervisadas (bancos, aseguradoras, fondos), verificar compliance con BCRA, CNV o SSN según corresponda.
6. **No aplica**: Si el contrato es claramente de otra jurisdicción, indicarlo en `_alertas` y clasificar todo `N`.
