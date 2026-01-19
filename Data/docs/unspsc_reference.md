# UNSPSC Reference

* [Excel](/dictionary/30.1/excel/unspsc_reference.html)
* [Text](/dictionary/30.1/text/unspsc_reference.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/unspsc_reference.html)
* [Oracle](/dictionary/30.1/oracle/unspsc_reference.html)

| **Purpose:** | Provide relevant aspects of the UNSPSC taxonomy. |
| **Table Name:** | unspsc_reference |
| **Download:** | [28_unspsc_reference.sql](/dl_files/database/db_30_1_mysql/28_unspsc_reference.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| commodity_code | Decimal(8,0) | UNSPSC commodity code |
| commodity_title | Character Varying(150) | UNSPSC commodity title |
| class_code | Decimal(8,0) | UNSPSC class code |
| class_title | Character Varying(150) | UNSPSC class title |
| family_code | Decimal(8,0) | UNSPSC family code |
| family_title | Character Varying(150) | UNSPSC family title |
| segment_code | Decimal(8,0) | UNSPSC segment code |
| segment_title | Character Varying(150) | UNSPSC segment title |

This file contains a listing of commodities in the United Nations Standard Products and Services Code (UNSPSC), version 260801. The UNSPSC is a four-level taxonomy for the classification of products and services, provided by the [United Nations Development Programme](http://www.unspsc.org/). In the taxonomy, the Segment is the most general element and the Commodity is the most specific. One example is listed below:

| Segment: | 43000000 | Information Technology Broadcasting and Telecommunications |
|---|---|---|
| Family: | 43230000 | Software |
| Class: | 43232100 | Content authoring and editing software |
| Commodity: | 43232104 | Word processing software |

Each technology or tool example is classified under this taxonomy; the “Commodity Code” and “Commodity Title” columns in the [*Technology Skills*](technology_skills.html "Technology Skills") and [*Tools Used*](tools_used.html "Tools Used") files can be used as a cross-reference into this file. The file is displayed in 8 tab delimited fields with the columns named Commodity Code, Commodity Title, Class Code, Class Title, Family Code, Family Title, Segment Code, and Segment Title. The 8 fields are represented by one row. There are a total of 4,264 rows of data in this file.

For more information, see:
* [O*NET Center Tools and Technology Quality Control Processes](https://www.onetcenter.org/reports/T2_QC.html)
* [O*NET Tools and Technology: A Synopsis of Data Development Procedures](https://www.onetcenter.org/reports/T2Development.html)
* [Identification of “Hot Technologies” within the O*NET® System](https://www.onetcenter.org/reports/Hot_Technologies.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 20.1 | Added as a new file |
| 20.2 - 30.1 | No structure changes |

### Data Example - unspsc_reference:

| commodity_code | commodity_title | class_code | class_title | family_code | family_title | segment_code | segment_title |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 12131704 | Explosive initiators | 12131700 | Igniters | 12130000 | Explosive materials | 12000000 | Chemicals including Bio Chemicals and Gas Materials |
| 12131707 | Lighters | 12131700 | Igniters | 12130000 | Explosive materials | 12000000 | Chemicals including Bio Chemicals and Gas Materials |
| 14111513 | Ledger paper | 14111500 | Printing and writing paper | 14110000 | Paper products | 14000000 | Paper Materials and Products |
| 14111802 | Receipts or receipt books | 14111800 | Business use papers | 14110000 | Paper products | 14000000 | Paper Materials and Products |