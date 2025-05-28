
interface KeyValuePair {
  key: string;
  value: string;
  icon?: string;
}

interface UnitSection {
  title: string;
  data: KeyValuePair[];
}

export const formatStructuredResponse = (text: string): KeyValuePair[] => {
  // Remove all markdown formatting
  const cleanText = text
    .replace(/\*\*/g, '') // Remove bold markdown
    .replace(/##/g, '') // Remove heading markdown
    .replace(/\*/g, '') // Remove italic markdown
    .replace(/`/g, '') // Remove code markdown
    .replace(/#{1,6}\s/g, ''); // Remove all heading levels

  const lines = cleanText.split('\n').filter(line => line.trim());
  const pairs: KeyValuePair[] = [];

  for (const line of lines) {
    // Look for emoji + text pattern
    const emojiMatch = line.match(/^([🏢📍🛏️🏗️🔢🔎💰📅🎯⚡🚗🏊‍♂️🧘‍♀️📚🏥🎓🌳🔒📋💡🌿🌍]+)\s*(.+)$/);
    
    if (emojiMatch) {
      const [, emoji, content] = emojiMatch;
      
      // Split by colon to get key-value
      const colonIndex = content.indexOf(':');
      if (colonIndex > 0) {
        const key = content.substring(0, colonIndex).trim();
        const value = content.substring(colonIndex + 1).trim();
        
        pairs.push({
          key,
          value,
          icon: emoji
        });
      }
    } else {
      // Handle regular key: value patterns
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        // Extract emoji from key if present
        const keyEmojiMatch = key.match(/^([🏢📍🛏️🏗️🔢🔎💰📅🎯⚡🚗🏊‍♂️🧘‍♀️📚🏥🎓🌳🔒📋💡🌿🌍]+)\s*(.+)$/);
        
        if (keyEmojiMatch) {
          const [, emoji, cleanKey] = keyEmojiMatch;
          pairs.push({
            key: cleanKey,
            value,
            icon: emoji
          });
        } else {
          pairs.push({
            key,
            value
          });
        }
      }
    }
  }

  return pairs;
};

export const formatUnitSections = (text: string): UnitSection[] => {
  // Remove all markdown formatting
  const cleanText = text
    .replace(/\*\*/g, '')
    .replace(/##/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/#{1,6}\s/g, '');

  const sections: UnitSection[] = [];
  
  // Check if text contains unit-specific information
  if (cleanText.includes('3 BHK') || cleanText.includes('4 BHK')) {
    const lines = cleanText.split('\n').filter(line => line.trim());
    let currentSection: UnitSection | null = null;
    
    for (const line of lines) {
      // Check for section headers
      if (line.includes('3 BHK') && !line.includes(':')) {
        if (currentSection) sections.push(currentSection);
        currentSection = { title: '3 BHK Apartments', data: [] };
        continue;
      }
      
      if (line.includes('4 BHK') && !line.includes(':')) {
        if (currentSection) sections.push(currentSection);
        currentSection = { title: '4 BHK Penthouses', data: [] };
        continue;
      }
      
      // Process key-value pairs
      const emojiMatch = line.match(/^([🏢📍🛏️🏗️🔢🔎💰📅🎯⚡🚗🏊‍♂️🧘‍♀️📚🏥🎓🌳🔒📋💡🌿🌍]+)\s*(.+)$/);
      
      if (emojiMatch && currentSection) {
        const [, emoji, content] = emojiMatch;
        const colonIndex = content.indexOf(':');
        if (colonIndex > 0) {
          const key = content.substring(0, colonIndex).trim();
          const value = content.substring(colonIndex + 1).trim();
          
          currentSection.data.push({ key, value, icon: emoji });
        }
      } else {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0 && currentSection) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          
          const keyEmojiMatch = key.match(/^([🏢📍🛏️🏗️🔢🔎💰📅🎯⚡🚗🏊‍♂️🧘‍♀️📚🏥🎓🌳🔒📋💡🌿🌍]+)\s*(.+)$/);
          
          if (keyEmojiMatch) {
            const [, emoji, cleanKey] = keyEmojiMatch;
            currentSection.data.push({ key: cleanKey, value, icon: emoji });
          } else {
            currentSection.data.push({ key, value });
          }
        }
      }
    }
    
    if (currentSection) sections.push(currentSection);
  }
  
  return sections;
};

export const extractTitle = (text: string): string | undefined => {
  const lines = text.split('\n');
  const firstLine = lines[0]?.trim();
  
  // Check if first line looks like a title (no colon, not too long)
  if (firstLine && !firstLine.includes(':') && firstLine.length < 100) {
    return firstLine.replace(/[#*]/g, '').trim();
  }
  
  return undefined;
};
