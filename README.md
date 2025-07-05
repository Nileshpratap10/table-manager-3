# Dynamic Data Table Manager

A feature-rich React table manager built with Next.js 14, Redux Toolkit, Material UI, and TypeScript. This application demonstrates advanced table management capabilities including dynamic columns, CSV import/export, inline editing, theming, and more.

## 🚀 Features

### Core Features
- **Dynamic Table View**: Display data with sortable columns, global search, and pagination
- **Dynamic Columns**: Add, remove, show/hide, and reorder columns with drag-and-drop
- **CSV Import/Export**: Import CSV files with validation and export current table view
- **Inline Editing**: Double-click cells to edit values with validation
- **Row Actions**: Edit and delete rows with confirmation dialogs

### Advanced Features
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works perfectly on all screen sizes
- **State Persistence**: User preferences saved with Redux Persist
- **Type Safety**: Full TypeScript support throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **State Management**: Redux Toolkit with Redux Persist
- **UI Library**: Material UI v5+ with custom theming
- **Type Safety**: TypeScript
- **CSV Processing**: PapaParse for parsing, FileSaver for downloads
- **Drag & Drop**: React Beautiful DnD for column reordering
- **Forms**: React Hook Form for form management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dynamic-table-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Table Operations
- **Sorting**: Click column headers to sort (ASC/DESC toggle)
- **Searching**: Use the global search bar to filter across all fields
- **Pagination**: Navigate through pages with 10 rows per page

### Column Management
1. Click "Manage Columns" button
2. Add new columns with custom keys, labels, and types
3. Toggle column visibility with checkboxes
4. Drag and drop to reorder columns
5. Changes apply immediately to the table

### CSV Operations
- **Import**: Click "Import CSV" to upload and parse CSV files
- **Export**: Click "Export CSV" to download current table view
- **Validation**: CSV files are validated for required columns and data types

### Inline Editing
- Double-click any cell to edit its value
- Press Enter to save or Escape to cancel
- Validation is applied based on column type

### Theme
- Click the theme toggle button in the app bar
- Theme preference is automatically saved

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── DataTable.tsx     # Main table component
│   ├── ManageColumnsModal.tsx # Column management modal
│   ├── ImportExportButtons.tsx # CSV import/export
│   ├── ThemeToggle.tsx   # Theme toggle component
│   └── ThemeProvider.tsx # Material UI theme provider
├── lib/                  # Utility libraries
│   ├── store/           # Redux store and slices
│   │   ├── store.ts     # Store configuration
│   │   ├── tableSlice.ts # Table state management
│   │   └── uiSlice.ts   # UI state management
│   ├── theme/           # Theme configuration
│   │   └── theme.ts     # Material UI themes
│   └── utils/           # Utility functions
│       └── csvUtils.ts  # CSV processing utilities
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── next.config.js       # Next.js configuration
└── README.md           # This file
```

## 🔧 Configuration

### TypeScript
The project uses strict TypeScript configuration with proper type checking and path mapping.

### Redux Store
- **tableSlice**: Manages table data, columns, sorting, filtering, and pagination
- **uiSlice**: Manages UI state including theme, modals, and loading states
- **Redux Persist**: Automatically saves user preferences to localStorage

### Material UI Theming
- Custom light and dark themes
- Responsive design with proper breakpoints
- Consistent component styling

## 🧪 Testing

The application includes sample data for testing:

```typescript
// Sample data structure
{
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  role: 'Developer'
}
```

### CSV Import Testing
Use the sample CSV format:
```csv
name,email,age,role,department
John Doe,john@example.com,30,Developer,Engineering
Jane Smith,jane@example.com,25,Designer,Design
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
No environment variables are required for basic functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Built with ❤️ using Next.js, Redux Toolkit, and Material UI** 