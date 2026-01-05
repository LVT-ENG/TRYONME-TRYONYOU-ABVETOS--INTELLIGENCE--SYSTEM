
## Exportar assets a otros proyectos

Para copiar todos los assets de `public/assets` a otro proyecto, utiliza el script:

```bash
./export_assets.sh /ruta/al/otro/proyecto
```

Esto copiará toda la estructura y archivos de assets al destino indicado, dentro de la carpeta `public/assets` del otro proyecto.

- El script requiere permisos de ejecución (`chmod +x export_assets.sh` si es necesario).
- Usa `rsync` para mantener la estructura y solo copiar cambios.
- Si la carpeta destino no existe, se creará automáticamente.

**Ejemplo:**

```bash
./export_assets.sh ../mi-otro-proyecto
```

Esto dejará los assets en `../mi-otro-proyecto/public/assets/`.
