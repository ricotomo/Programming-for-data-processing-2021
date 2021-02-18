
gene_copy_numbers = [32,3,5,12,45,23,88,1,8,5,10,0,32,0,88]

gene_names = ["has-let-7a","has-mir-9" ,"has-mir-121" ,"has-mir-23", "has-mir-19", "has-mir-221", "has-mir-89" , "has-mir-1034", "has-mir-12", "has-mir-2088", "has-mir-56" , "has-mir-55a" , "has-mir-55b", "has-mir-127", "has-mir-17"]

gene_zipped = zip(gene_copy_numbers, gene_names)
average_copy_number = sum(gene_copy_numbers)/len(gene_copy_numbers)

# Prints the names of the miRNAs (-mir-) with gene copy
# number values exceeding the average copy number value
# for all the genes.

def aboveAverage_miRNAs(num):
    filteredList = list(filter(lambda k: 'mir' in k[1], num))
    filterAverage = list(filter(lambda x : x[0] > average_copy_number, filteredList))
    return ([i[1] for i in filterAverage])

aboveList = aboveAverage_miRNAs(list(gene_zipped))
print(aboveList)

#Prints the names of the miRNA genes with 0 copy numbers

def zero_copies(zero):
    filterMir = list(filter(lambda k: 'mir' in k[1], zero))
    filterZero = list(filter(lambda x : x[0] == 0, filterMir))
    return ([i[1] for i in filterZero])

gene_copy_numbers_2 = [32,3,5,12,45,23,88,1,8,5,10,0,32,0,88]

gene_names_2 = ["has-let-7a","has-mir-9" ,"has-mir-121" ,"has-mir-23", "has-mir-19", "has-mir-221", "has-mir-89" , "has-mir-1034", "has-mir-12", "has-mir-2088", "has-mir-56" , "has-mir-55a" , "has-mir-55b", "has-mir-127", "has-mir-17"]

gene_zipped_2 = zip(gene_copy_numbers_2, gene_names_2)

zeroList = zero_copies(list(gene_zipped_2))
print(zeroList)

# Prints what is the value of the highest copy number for all
# the genes

print(max(gene_copy_numbers))

#Constructs a dictionary gene_name -> gene_copy_number

dictionary = dict(zip(gene_names, gene_copy_numbers))
print(dictionary)