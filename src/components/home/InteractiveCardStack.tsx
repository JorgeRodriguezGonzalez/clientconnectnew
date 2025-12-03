import React, { useId } from 'react';
import { cn } from '@/lib/utils';

// --- Matriz de Transformación 3D ---
const MATRIX_TRANSFORM = "matrix(0.865865, 0.500278, -0.871576, 0.490261, 182.681, 21.2223)";
const MATRIX_TRANSFORM_ALT = "matrix(0.865865, 0.500278, -0.871576, 0.490261, 182.393, 17.2223)";

// --- Paleta de Colores (Mapeo) ---
// Stroke/Bordes (#3b82f6) -> #9A4526 (Marrón Rojizo)
// Fill Principal (#93c5fd) -> #E8A288 (Coral Suave)
// Fill Secundario (#bfdbfe) -> #F4D3C6 (Coral Pastel)
// Fill Claro (#eff6ff) -> #F9E2D8 (Piel / Crema)
// Acentos (#60a5fa) -> #DE8363 (Coral Base)
// Highlights -> #FFF5F2 (Blanco Cálido)

/**
 * CAPA SUPERIOR (NodeCardLayer) - DISEÑO TIERRA
 * Incluye TODOS los detalles: Nodos, Lista lateral, Iconos, Líneas.
 */
const NodeCardLayer = ({ idPrefix }: { idPrefix: string }) => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none align-middle">
    <defs>
      {/* ClipPaths originales conservados para la estructura exacta */}
      <clipPath id={`${idPrefix}clip0`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 20.9684)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip1`}>
        <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.071 22.9117)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip2`}>
        <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 116.703 59.6813)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip3`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 197.586 53.6777)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip4`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.148 77.691)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip5`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 280.709 101.704)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip6`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.271 125.718)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip7`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 363.832 149.731)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip8`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.23 89.4573)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip9`}>
        <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 94.042 72.4279)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip10`}>
        <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 28.6738 109.197)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip11`}>
        <rect width="8" height="8" fill="white" transform="matrix(0.865865 0.500278 -0.871576 0.490261 275.411 257.72)" />
      </clipPath>
      <clipPath id={`${idPrefix}clip12`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 109.557 103.194)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip13`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 151.118 127.207)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip14`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 192.68 151.22)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip15`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 234.241 175.234)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip16`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 254.885 211.013)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip17`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 213.324 187)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}clip18`}>
        <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 130.201 138.973)" fill="white" />
      </clipPath>
    </defs>

    <g>
      <g clipPath={`url(#${idPrefix}clip0)`}>
        {/* FONDO PRINCIPAL DE LA TARJETA SUPERIOR */}
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 20.9684)" fill="#E8A288" />
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.502 27.1655)" fill="#E8A288" />
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.502 27.1655)" stroke="#9A4526" />
        
        {/* PANEL CLARO SUPERIOR DERECHA */}
        <g clipPath={`url(#${idPrefix}clip1)`}>
          <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.071 22.9117)" fill="#F4D3C6" />
          
          <g clipPath={`url(#${idPrefix}clip2)`}>
            {/* Barra de título/búsqueda */}
            <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 116.703 59.6813)" fill="#F4D3C6" />
            
            {/* Icono de usuario / Detalles header */}
            <path d="M367.747 214.667C365.34 216.021 361.451 215.999 359.06 214.617C356.669 213.236 356.682 211.018 359.088 209.664C361.495 208.311 365.384 208.333 367.775 209.715C370.167 211.096 370.154 213.313 367.747 214.667ZM360.82 210.665C359.376 211.477 359.368 212.808 360.803 213.637C362.238 214.465 364.571 214.479 366.015 213.667C367.459 212.854 367.467 211.524 366.032 210.695C364.598 209.866 362.264 209.853 360.82 210.665Z" fill="#DE8363" />
            <path d="M366.904 210.205C367.385 209.934 368.176 209.936 368.549 210.26C368.906 210.572 369.177 210.914 369.348 211.276C369.626 211.864 369.631 212.483 369.362 213.071C369.094 213.659 368.56 214.196 367.815 214.628C367.357 214.894 366.829 215.115 366.251 215.284C365.649 215.46 364.96 215.237 364.773 214.864C364.586 214.492 364.982 214.113 365.537 213.893C365.723 213.819 365.896 213.736 366.056 213.643C366.503 213.384 366.823 213.062 366.984 212.709C367.146 212.356 367.143 211.985 366.976 211.632C366.916 211.506 366.837 211.384 366.738 211.267C366.444 210.917 366.423 210.476 366.904 210.205Z" fill="#9A4526" />
            
            {/* Barras de menú (simuladas) */}
            <rect x="-0.00285524" y="0.495269" width="23" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 335.723 193.684)" fill="#F4D3C6" />
            <rect x="-0.00285524" y="0.495269" width="23" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 335.723 193.684)" stroke="#9A4526" />
            <rect x="-0.00285524" y="0.495269" width="15" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 316.673 182.678)" fill="#F4D3C6" />
            <rect x="-0.00285524" y="0.495269" width="15" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 316.673 182.678)" stroke="#9A4526" />
          </g>
          
          <rect x="-0.00285524" y="0.495269" width="307" height="19" transform="matrix(0.865865 0.500278 -0.871576 0.490261 117.134 59.9352)" stroke="#9A4526" />
          
          {/* --- NODOS Y CONEXIONES (DERECHA) --- */}
          
          {/* NODO 1 */}
          <g clipPath={`url(#${idPrefix}clip3)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 197.586 53.6777)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 198 56.9032)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 198 56.9032)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 198.017 53.9316)" stroke="#9A4526" />
          
          {/* LÍNEAS DE CONEXIÓN */}
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 223.909 74.415)" fill="#9A4526" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 265.47 98.4283)" fill="#9A4526" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 307.032 122.442)" fill="#9A4526" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 348.593 146.455)" fill="#9A4526" />
          
          {/* NODO 2 */}
          <g clipPath={`url(#${idPrefix}clip4)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.148 77.691)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.562 80.9165)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.562 80.9165)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.579 77.9449)" stroke="#9A4526" />
          
          {/* NODO 3 */}
          <g clipPath={`url(#${idPrefix}clip5)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 280.709 101.704)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 281.123 104.93)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 281.123 104.93)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 281.141 101.958)" stroke="#9A4526" />
          
          {/* NODO 4 */}
          <g clipPath={`url(#${idPrefix}clip6)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.271 125.718)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.685 128.943)" fill="#F4D3C6" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.685 128.943)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 322.702 125.972)" stroke="#9A4526" />
          
          {/* NODO 5 */}
          <g clipPath={`url(#${idPrefix}clip7)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 363.832 149.731)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 364.246 152.956)" fill="#F4D3C6" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 364.246 152.956)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 364.264 149.985)" stroke="#9A4526" />
          
          {/* NODO 6 (Lateral) */}
          <g clipPath={`url(#${idPrefix}clip8)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.23 89.4573)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.644 92.6827)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.644 92.6827)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 218.661 89.7112)" stroke="#9A4526" />
          <rect width="1" height="12" transform="matrix(0.865865 0.500278 -0.871576 0.490261 243.841 92.329)" fill="#9A4526" />
          
          {/* CHECKMARKS (Iconos de completado) */}
          <path d="M386.91 168.606C385.525 169.385 383.286 169.372 381.91 168.577C380.534 167.782 380.541 166.506 381.926 165.727C383.312 164.948 385.55 164.96 386.926 165.756C388.303 166.551 388.295 167.827 386.91 168.606ZM382.923 166.303C382.092 166.77 382.088 167.536 382.913 168.013C383.739 168.49 385.082 168.498 385.913 168.03C386.744 167.563 386.749 166.797 385.923 166.32C385.097 165.843 383.754 165.835 382.923 166.303Z" fill="#DE8363" />
          <path d="M386.425 166.038C386.702 165.882 387.157 165.883 387.371 166.07C387.521 166.2 387.645 166.341 387.739 166.488C387.914 166.762 387.984 167.055 387.942 167.345C387.9 167.635 387.748 167.916 387.497 168.169C387.246 168.422 386.901 168.64 386.487 168.809C386.072 168.978 385.598 169.093 385.096 169.147C384.595 169.201 384.078 169.193 383.581 169.122C383.085 169.051 382.62 168.919 382.22 168.737C382.005 168.639 381.811 168.527 381.642 168.404C381.401 168.228 381.545 167.983 381.894 167.884C382.242 167.785 382.662 167.873 382.942 168.029C382.992 168.057 383.045 168.084 383.099 168.109C383.34 168.218 383.618 168.297 383.916 168.34C384.214 168.382 384.524 168.387 384.825 168.355C385.126 168.323 385.411 168.253 385.659 168.152C385.908 168.051 386.115 167.92 386.266 167.768C386.416 167.616 386.507 167.448 386.532 167.274C386.557 167.099 386.516 166.924 386.411 166.759C386.387 166.722 386.36 166.685 386.329 166.649C386.16 166.448 386.148 166.194 386.425 166.038Z" fill="#9A4526" />
          <path d="M344.91 144.606C343.525 145.385 341.286 145.372 339.91 144.577C338.534 143.782 338.541 142.506 339.926 141.727C341.312 140.948 343.55 140.96 344.926 141.756C346.303 142.551 346.295 143.827 344.91 144.606ZM340.923 142.303C340.092 142.77 340.088 143.536 340.913 144.013C341.739 144.49 343.082 144.498 343.913 144.03C344.744 143.563 344.749 142.797 343.923 142.32C343.097 141.843 341.754 141.835 340.923 142.303Z" fill="#DE8363" />
          <path d="M344.425 142.038C344.702 141.882 345.157 141.883 345.371 142.07C345.608 142.275 345.778 142.505 345.871 142.747C346.015 143.121 345.97 143.51 345.741 143.868C345.511 144.227 345.107 144.54 344.576 144.772C344.044 145.003 343.407 145.143 342.739 145.175C342.071 145.207 341.399 145.13 340.803 144.953C340.206 144.776 339.709 144.506 339.369 144.175C339.029 143.844 338.861 143.465 338.885 143.083C338.9 142.836 338.994 142.594 339.162 142.369C339.314 142.164 339.762 142.12 340.084 142.247C340.406 142.374 340.475 142.625 340.372 142.84C340.329 142.929 340.304 143.022 340.298 143.116C340.284 143.346 340.385 143.573 340.589 143.772C340.792 143.97 341.091 144.132 341.449 144.239C341.807 144.345 342.21 144.391 342.611 144.372C343.012 144.352 343.394 144.268 343.713 144.13C344.032 143.991 344.274 143.803 344.412 143.588C344.549 143.373 344.576 143.139 344.49 142.915C344.454 142.823 344.4 142.733 344.329 142.649C344.16 142.448 344.148 142.194 344.425 142.038Z" fill="#9A4526" />
        </g>
        
        {/* --- STACK DE TARJETAS (IZQUIERDA) --- */}
        
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.503 23.1656)" stroke="#9A4526" />
        
        {/* Cuerpo del Stack Izquierdo */}
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 94.4734 76.6819)" fill="#E8A288" />
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 94.4734 76.6819)" stroke="#9A4526" />
        
        <g clipPath={`url(#${idPrefix}clip9)`}>
          <rect width="308" height="95" rx="10" transform="matrix(0.865865 0.500278 -0.871576 0.490261 94.042 72.4279)" fill="#F4D3C6" />
          
          <g clipPath={`url(#${idPrefix}clip10)`}>
            <rect width="308" height="20" transform="matrix(0.865865 0.500278 -0.871576 0.490261 28.6738 109.197)" fill="#F4D3C6" />
            
            {/* Icono de círculo con flecha */}
            <circle cx="5" cy="5" r="5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 275.417 256.729)" fill="#DE8363" />
            <g clipPath={`url(#${idPrefix}clip11)`}>
              <path d="M273.244 260.537L272.903 262.234L279.193 261.893" stroke="#FFF5F2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <rect x="-0.00285524" y="0.495269" width="19" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 251.157 245.202)" fill="#F4D3C6" />
            <rect x="-0.00285524" y="0.495269" width="19" height="4" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 251.157 245.202)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="307" height="19" transform="matrix(0.865865 0.500278 -0.871576 0.490261 29.1051 109.451)" stroke="#9A4526" />
          
          {/* LISTA DE ITEMS (Izquierda) */}
          {/* Item 1 */}
          <g clipPath={`url(#${idPrefix}clip12)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 109.557 103.194)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 109.971 106.419)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 109.971 106.419)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 109.988 103.448)" stroke="#9A4526" />
          
          {/* Item 2 */}
          <g clipPath={`url(#${idPrefix}clip13)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 151.118 127.207)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 151.533 130.433)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 151.533 130.433)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 151.55 127.461)" stroke="#9A4526" />
          
          {/* Item 3 */}
          <g clipPath={`url(#${idPrefix}clip14)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 192.68 151.22)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 193.094 154.446)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 193.094 154.446)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 193.111 151.474)" stroke="#9A4526" />
          
          {/* Item 4 */}
          <g clipPath={`url(#${idPrefix}clip15)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 234.241 175.234)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 234.656 178.459)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 234.656 178.459)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 234.673 175.488)" stroke="#9A4526" />
          
          {/* Item 5 */}
          <g clipPath={`url(#${idPrefix}clip16)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 254.885 211.013)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 255.299 214.239)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 255.299 214.239)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 255.316 211.267)" stroke="#9A4526" />
          
          {/* Item 6 */}
          <g clipPath={`url(#${idPrefix}clip17)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 213.324 187)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 213.738 190.226)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 213.738 190.226)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 213.755 187.254)" stroke="#9A4526" />
          
          {/* Item 7 */}
          <g clipPath={`url(#${idPrefix}clip18)`}>
            <rect width="36" height="12" rx="4" transform="matrix(0.865865 0.500278 -0.871576 0.490261 130.201 138.973)" fill="#F9E2D8" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 130.615 142.199)" fill="#DE8363" />
            <rect x="-0.00285524" y="0.495269" width="5" height="5" rx="1.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 130.615 142.199)" stroke="#9A4526" />
          </g>
          <rect x="-0.00285524" y="0.495269" width="35" height="11" rx="3.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 130.632 139.227)" stroke="#9A4526" />
          
          {/* Líneas conectoras del Stack */}
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 135.879 123.931)" fill="#9A4526" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 177.441 147.944)" fill="#9A4526" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 219.002 171.958)" fill="#9A4526" />
          <rect width="12" height="1" transform="matrix(0.865865 0.500278 -0.871576 0.490261 239.646 207.737)" fill="#9A4526" />
          <rect width="1" height="12" transform="matrix(0.865865 0.500278 -0.871576 0.490261 238.935 189.872)" fill="#9A4526" />
          <rect width="1" height="12" transform="matrix(0.865865 0.500278 -0.871576 0.490261 155.812 141.845)" fill="#9A4526" />
        </g>
        
        <rect x="-0.00285524" y="0.495269" width="307" height="94" rx="9.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 94.4733 72.6817)" stroke="#9A4526" />
        
        {/* Sombra base final */}
        <rect x="-0.00285524" y="0.495269" width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 21.2223)" stroke="#9A4526" />
      </g>
    </g>
  </svg>
);

/**
 * CAPA BASE (WaveCardLayer) - MODIFICADA A TURQUESA
 * Paleta cambiada de Coral a Turquesa/Teal manteniendo los niveles de luz.
 */
const WaveCardLayer = ({ idPrefix }: { idPrefix: string }) => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id={`${idPrefix}_wave_clip`}>
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)" fill="white" />
      </clipPath>
      <clipPath id={`${idPrefix}_bar_clip`}>
         <rect width="48" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="white" />
      </clipPath>
    </defs>
    <g>
      {/* Base de la tarjeta (Turquesa Principal - #5EEAD4 equiv a #E8A288) */}
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 27.2224)" fill="#2DD4BF" />
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 27.2224)" stroke="#134E4A" />
      
      {/* Decoración Izquierda */}
      <rect x="9.07227" y="115.314" width="8.50049" height="13.0286" fill="#2DD4BF" />
      <line x1="9.48145" y1="128.85" x2="9.48145" y2="111.85" stroke="#134E4A" />
      
      {/* Contenido de Ondas */}
      <g clipPath={`url(#${idPrefix}_wave_clip)`}>
        {/* Fondo ondas (Muy claro - equiv a #F9E2D8) */}
        <rect width="320" height="208" rx="16" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.105 10.9685)" fill="#CCFBF1" />
        
        {/* Onda media (Principal - equiv a #E8A288) */}
        <path d="M267.32 145.001L267.037 145.188L267.254 145.403C272.754 150.884 271.48 157.941 263.28 162.554C253.493 168.059 237.675 167.968 227.952 162.35L190.672 140.81C182.94 136.343 182.981 129.174 190.764 124.797C198.337 120.537 210.434 120.525 218.202 124.654L218.744 124.942L219.139 124.588C220.344 123.504 221.707 122.475 223.361 121.545C235.153 114.912 254.213 115.022 265.928 121.79C277.059 128.222 277.426 138.316 267.32 145.001Z" fill="#2DD4BF" stroke="#134E4A" />
        <path d="M243.874 138.037C250.893 137.857 258.027 139.312 263.372 142.4C264.974 143.326 266.246 144.387 267.326 145.464" stroke="#134E4A" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Onda inferior (Intermedio - equiv a #F4D3C6) */}
        <path d="M267.32 143.001L267.037 143.188L267.254 143.403C272.754 148.884 271.48 155.941 263.28 160.554C253.493 166.059 237.675 165.968 227.952 160.35L190.672 138.81C182.94 134.343 182.981 127.174 190.764 122.797C198.337 118.537 210.434 118.525 218.202 122.654L218.744 122.942L219.139 122.588C220.344 121.504 221.707 120.475 223.361 119.545C235.153 112.912 254.213 113.022 265.928 119.79C277.059 126.222 277.426 136.316 267.32 143.001Z" fill="#99F6E4" stroke="#134E4A" />
        
        {/* Barra de Progreso */}
         <g clipPath={`url(#${idPrefix}_bar_clip)`}>
            <rect width="48" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="#CCFBF1" />
            <rect width="32" height="6" transform="matrix(0.865865 0.500278 -0.871576 0.490261 176.971 148.133)" fill="#0F766E" />
         </g>
        <rect width="47" height="5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 177.402 148.387)" stroke="#134E4A" />
      </g>

      {/* Círculos dispersos */}
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.037 22.855)" fill="#2DD4BF" stroke="#134E4A" />
      <circle cx="3" cy="3" r="2.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 433.138 167.936)" fill="#2DD4BF" stroke="#134E4A" />
      
      {/* Borde Superior */}
      <rect width="319" height="207" rx="15.5" transform="matrix(0.865865 0.500278 -0.871576 0.490261 182.537 11.2224)" stroke="#134E4A" />
    </g>
  </svg>
);

/**
 * CAPA FANTASMA (GhostCardLayer)
 * Tarjeta genérica gris
 */
const GhostCardLayer = () => (
  <svg width="460" height="300" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.4">
      <rect width="319" height="207" rx="15.5" transform={MATRIX_TRANSFORM} fill="#E4E4E7" />
      <rect width="319" height="207" rx="15.5" transform={MATRIX_TRANSFORM} stroke="#A1A1AA" />
      <rect width="319" height="207" rx="15.5" transform={MATRIX_TRANSFORM_ALT} fill="#FAFAFA" />
      <rect width="319" height="207" rx="15.5" transform={MATRIX_TRANSFORM_ALT} stroke="#A1A1AA" />
    </g>
  </svg>
);

// --- COMPONENTE PRINCIPAL EXPORTADO ---
export const InteractiveCardStack = ({ className }: { className?: string }) => {
  const idPrefix = useId().replace(/:/g, ''); // Sanitizar ID

  // Animación de flotación suave
  const floatKeyframes = `
    @keyframes subtle-float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .animate-subtle-float {
      animation: subtle-float 6s ease-in-out infinite;
    }
  `;

  return (
    <div className={cn("relative w-[460px] h-[470px] select-none group mx-auto", className)}>
      <style>{floatKeyframes}</style>

      {/* CAPA 4: FONDO (Wave Card - Diseño Ondas TURQUESA) */}
      <div 
        className="absolute top-0 left-0 z-0 transition-transform duration-500 ease-out group-hover:-translate-y-[100px]"
        style={{ transform: 'translateY(-80px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '0s' }}>
          <WaveCardLayer idPrefix={idPrefix + 'wave'} />
        </div>
      </div>

      {/* CAPA 3: FANTASMA */}
      <div 
        className="absolute top-0 left-0 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-[35px]"
        style={{ transform: 'translateY(-20px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '1.5s' }}>
          <GhostCardLayer />
        </div>
      </div>

      {/* CAPA 2: FANTASMA */}
      <div 
        className="absolute top-0 left-0 z-20 transition-transform duration-500 ease-out group-hover:translate-y-[30px]"
        style={{ transform: 'translateY(40px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '3s' }}>
          <GhostCardLayer />
        </div>
      </div>

      {/* CAPA 1: FRENTE (Node Card - Diseño Tierra Completo) */}
      <div 
        className="absolute top-0 left-0 z-30 transition-transform duration-500 ease-out group-hover:translate-y-[100px] cursor-pointer"
        style={{ transform: 'translateY(100px)' }}
      >
        <div className="animate-subtle-float" style={{ animationDelay: '0.5s' }}>
          <NodeCardLayer idPrefix={idPrefix + 'node'} />
        </div>
      </div>

    </div>
  );
};