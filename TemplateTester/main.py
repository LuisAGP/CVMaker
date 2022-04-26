from weasyprint import HTML

if __name__ == '__main__':
    HTML('./Plantilla/plantilla.html', encoding="utf8").write_pdf('test.pdf')