export const getInitials = (name) => {
    if (!name) return '';
  
    // Split the name into words
    const words = name.split(' ');
  
    // Extract the first letter of the first two words
    const initials = words.slice(0, 2).map(word => word[0].toUpperCase());
  
    // Join the initials and return the result
    return initials.join('');
  };
  