# Tools Used

* [Excel](/dictionary/30.1/excel/tools_used.html)
* [Text](/dictionary/30.1/text/tools_used.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/tools_used.html)
* [Oracle](/dictionary/30.1/oracle/tools_used.html)

| **Purpose:** | Provide Tools Used examples. |
| **Table Name:** | tools_used |
| **Download:** | [32_tools_used.sql](/dl_files/database/db_30_1_mysql/32_tools_used.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| example | Character Varying(150) | Tool example |
| commodity_code | Decimal(8,0) | UNSPSC commodity code *(see [*UNSPSC Reference*](unspsc_reference.html "UNSPSC Reference"))* |

*No longer updated or displayed in O*NET websites*

This file contains the Tools Used examples associated with O*NET-SOC occupations. The columns “Commodity Code” and “Commodity Title” classify the example under the United Nations Standard Products and Services Code (UNSPSC). See the [*UNSPSC Reference*](unspsc_reference.html "UNSPSC Reference") section for more information.

The file is displayed in three tab delimited fields with the columns named O*NET-SOC Code, Example, and Commodity Code. The three fields are represented by one row. There are a total of 41,662 rows of data in this file.

For more information, see:
* [O*NET Center Tools and Technology Quality Control Processes](https://www.onetcenter.org/reports/T2_QC.html)
* [O*NET Tools and Technology: A Synopsis of Data Development Procedures](https://www.onetcenter.org/reports/T2Development.html)
* [Tools and Technology Search](https://www.onetcenter.org/reports/T2_Search.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 23.2 | Added as a new file |
| 23.3 - 30.1 | No structure changes |

### Data Example - tools_used:

| onetsoc_code | example | commodity_code |
| --- | --- | --- |
| 11-2011.00 | Computer data input scanners | 43211711 |
| 11-2011.00 | Desktop computers | 43211507 |
| 11-2011.00 | Handheld computers | 43211715 |
| 11-2011.00 | Laptop computers | 43211503 |
| 11-2011.00 | Laser facsimile machines | 44101508 |