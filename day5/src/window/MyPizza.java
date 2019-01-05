package window;

import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class MyPizza {

	JFrame	f;
	JLabel	l1, l2;
	JButton	b1, b2, b3;
	
	JLabel  mt1, mt2, mt3, mt4;
	JTextField 	t1, t2, t3, t4;
	
	int		sum1, sum2, sum3, total;

	public	MyPizza() {
		JFrame f = new JFrame();
		f.setTitle("My Pizza");
		f.setSize(500, 250);
			
		l1 = new JLabel("<< 자바 피자에 오신 것을 환영합니다. >>");
		l2 = new JLabel("개수");
		
		b1	= new JButton("콤보피자");
		b2	= new JButton("포테이토피자");
		b3	= new JButton("불고기피자");
		
		t1	= new JTextField(15);
		t2	= new JTextField(15);
		t3	= new JTextField(15);
		t4	= new JTextField(15);
		
		mt1 = new JLabel("콤보피자");
		mt2 = new JLabel("포테이토피자");
		mt3 = new JLabel("불고기피자");
		mt4 = new JLabel("합  계");
		
		//FlowLayout flow = new FlowLayout();
		f.setLayout(null);
		
		l1.setBounds(10, 10, 300, 20);
		
		b1.setBounds(010, 40, 150, 30);
		b2.setBounds(170, 40, 150, 30);
		b3.setBounds(330, 40, 150, 30);
		
		mt1.setBounds(010, 100, 100, 20);
		t1.setBounds(110, 100, 150, 20);
		
		mt2.setBounds(010, 125, 100, 20);
		t2.setBounds(110, 125, 150, 20);
		
		mt3.setBounds(010, 150, 100, 20);
		t3.setBounds(110, 150, 150, 20);
		
		mt4.setBounds(010, 175, 100, 20);
		t4.setBounds(110, 175, 150, 20);
		
		
		f.add(l1); 
		
		f.add(b1);
		f.add(b2);
		f.add(b3);
			
		f.add(mt1);
		f.add(t1);
		
		f.add(mt2);
		f.add(t2);
		
		f.add(mt3);
		f.add(t3);
		
		f.add(mt4);
		f.add(t4);
		
		b1.addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				
				sum1 = sum1 + 1;
				total = total + 1;
								
				t1.setText(sum1 + "");
				t4.setText(total + "");
			}
		});
		
		b2.addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				
				sum2 = sum2 + 1;
				total = total + 1;
				
				t2.setText(sum2 + "");
				t4.setText(total + "");
			}
		});
		
		b3.addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				
				sum3 = sum3 + 1;
				total = total + 1;
				
				t3.setText(sum3 + "");
				t4.setText(total + "");
			}
		});
		//f.add(result);
			
		//cbt.addActionListener(this);
		
		f.setVisible(true);		
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		MyPizza	pizza = new MyPizza();
	}
	
	

}

