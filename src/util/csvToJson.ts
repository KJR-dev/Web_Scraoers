import csvToJSON from 'convert-csv-to-json';
import fs from 'fs';
import logger from './logger';

interface CSVRow {
    [key: string]: string | number;
}

// Utility function to remove extra quotes from keys & values
const cleanJSON = (data: CSVRow[]): CSVRow[] => {
    return data.map((row) => {
        const cleanedRow: CSVRow = {};
        Object.entries(row).forEach(([key, value]) => {
            const cleanKey = key.replace(/^"|"$/g, ''); // Remove surrounding quotes from keys
            const cleanValue = typeof value === 'string' ? value.replace(/^"|"$/g, '') : value; // Remove quotes from values
            cleanedRow[cleanKey] = cleanValue;
        });
        return cleanedRow;
    });
};

// Convert CSV to JSON Object with Emails
export const csvToJSONConvert = (file: Express.Multer.File): Record<string, string>[] => {
    const filePath = file.path;

    try {
        csvToJSON.fieldDelimiter(',');
        const jsonArray = csvToJSON.getJsonFromCsv(filePath) as CSVRow[];
        const cleanedJsonArray = cleanJSON(jsonArray);

        // ✅ Convert to an array of email objects
        const emails = Array.from(new Set(cleanedJsonArray.map((row) => row.email).filter(Boolean) as string[])).map((email) => ({ email }));

        // ✅ Delete CSV file after conversion
        fs.unlink(filePath, (err) => {
            if (err) {
                logger.error('❌ Error deleting CSV file:', err);
            } else {
                logger.info('🗑️ CSV file deleted successfully:', filePath);
            }
        });

        console.log('📧 Extracted Emails:', emails);
        return emails;
    } catch (error) {
        logger.error('❌ Error converting CSV to JSON:', error);
        throw new Error('CSV to JSON conversion failed.');
    }
};

