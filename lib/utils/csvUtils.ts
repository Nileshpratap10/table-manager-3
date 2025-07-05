import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow, Column } from '../store/tableSlice';

export interface CSVRow {
  [key: string]: string | number;
}

/**
 * Parse CSV file and return structured data
 */
export function parseCSV(file: File): Promise<CSVRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
        } else {
          resolve(results.data as CSVRow[]);
        }
      },
      error: (error) => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      },
    });
  });
}

/**
 * Convert CSV data to table rows with proper typing
 */
export function csvToTableRows(csvData: CSVRow[]): TableRow[] {
  return csvData.map((row, index) => {
    const tableRow: TableRow = {
      id: row.id?.toString() || `row-${index + 1}`,
      name: row.name?.toString() || '',
      email: row.email?.toString() || '',
      age: typeof row.age === 'number' ? row.age : parseInt(row.age?.toString() || '0', 10),
      role: row.role?.toString() || '',
    };

    // Add any additional dynamic columns
    Object.keys(row).forEach(key => {
      if (!['id', 'name', 'email', 'age', 'role'].includes(key)) {
        tableRow[key] = row[key];
      }
    });

    return tableRow;
  });
}

/**
 * Export table data to CSV file
 */
export function exportToCSV(rows: TableRow[], visibleColumns: Column[]): void {
  // Filter to only visible columns
  const visibleColumnKeys = visibleColumns
    .filter(col => col.visible)
    .map(col => col.key);

  // Prepare data for export
  const exportData = rows.map(row => {
    const exportRow: CSVRow = {};
    visibleColumnKeys.forEach(key => {
      exportRow[key] = row[key] || '';
    });
    return exportRow;
  });

  // Convert to CSV string
  const csv = Papa.unparse(exportData);
  
  // Create and download file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const fileName = `table-export-${new Date().toISOString().split('T')[0]}.csv`;
  saveAs(blob, fileName);
}

/**
 * Validate CSV data structure
 */
export function validateCSVData(data: CSVRow[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (data.length === 0) {
    errors.push('CSV file is empty');
    return { isValid: false, errors };
  }

  // Check for required columns
  const firstRow = data[0];
  const requiredColumns = ['name', 'email'];
  const missingColumns = requiredColumns.filter(col => !(col in firstRow));
  
  if (missingColumns.length > 0) {
    errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  // Validate email format
  data.forEach((row, index) => {
    if (row.email && !isValidEmail(row.email.toString())) {
      errors.push(`Invalid email format in row ${index + 1}: ${row.email}`);
    }
    
    if (row.age && isNaN(Number(row.age))) {
      errors.push(`Invalid age in row ${index + 1}: ${row.age}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate sample CSV data for testing
 */
export function generateSampleCSV(): string {
  const sampleData = [
    { name: 'John Doe', email: 'john@example.com', age: 30, role: 'Developer', department: 'Engineering' },
    { name: 'Jane Smith', email: 'jane@example.com', age: 25, role: 'Designer', department: 'Design' },
    { name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'Manager', department: 'Management' },
  ];
  
  return Papa.unparse(sampleData);
} 