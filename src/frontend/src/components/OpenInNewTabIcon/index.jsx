const OpenInNewTabIcon = ({ width = 16, height = 16, ...props }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      aria-hidden="true" 
      focusable="false" 
      role="img" 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      {...props}
    >
      <path d="M14 3v2h4.59l-9.3 9.29 1.41 1.42 9.29-9.3v4.59h2V3z"/>
      <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"/>
    </svg>
  );
  
  export default OpenInNewTabIcon;